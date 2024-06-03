import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs, {mkdtemp, readdir, rm, readFile} from "fs/promises";
import {join} from "path";
import {tmpdir} from "os";
import {parse} from "path";
import {promisify} from "util";
import childProcess from "child_process";
import octokit from "./octokit";
import cartesian from "fast-cartesian";
import translucid from "./util/translucid";
import withId from "./util/withId";
import dedent from "ts-dedent";
import forwardPaginationHelper from "./util/forwardPaginationHelper";

const exec = promisify(childProcess.exec);

export async function scrapeColorscheme(name, owner) {
  // Create a temporary directory on the filesystem to use as workpsace.
  const tmpColorschemeDir = await mkdtemp(join(tmpdir(), "ch-"));
  const rmTmpColorschemeDir = () => rm(tmpColorschemeDir, {recursive: true});

  // Fetch GitHub information about the repository
  let repository;
  try {
    ({repository} = await octokit.graphql(
      `
        query colorschemeRepository($owner: String!, $name: String!) {
          repository(owner: $owner, name: $name) {
            description
            stargazerCount
            url
            createdAt
            updatedAt
          }
        }
    `,
      {owner, name},
    ));
  } catch {
    await rmTmpColorschemeDir();
    throw new Error(dedent`
      Unable to find a GitHub repository with the name ${owner}/${name}.
      Make sure the repository exists and is publically available.
    `);
  }

  // Clone the repository on the temporary workspace.
  await git.clone({
    fs,
    http,
    dir: tmpColorschemeDir,
    url: repository.url,
    // Only retrieve the latest layer of history. This speeds
    // things up a bit since we only need the files.
    depth: 1,
  });

  // A colorscheme may have more than a single file. Neovim uses the
  // colors/.*(\.vim|\.lua) file structure to detect and load these variants.
  // This is a good read if you want to understand how the file structure
  // of Vim plugins work: https://learnvimscriptthehardway.stevelosh.com/chapters/42.html
  const colorsDir = join(tmpColorschemeDir, "colors");
  let variantFiles;
  try {
    variantFiles = (await readdir(colorsDir)).filter(
      (file) => file.endsWith(".vim") || file.endsWith(".lua"),
    );
  } catch {
    await rmTmpColorschemeDir();
    throw new Error(dedent`
      This repoistory does not seems to follow the structure of a Vim plugin.
      Ensure the folder \`colors/\` exists on the root of the repository,
      containing the colorschemes definitions.
    `);
  }

  const variantNames = variantFiles.map((file) => parse(file).name);
  // An array of tuples containing every combination
  // of variants and backgrounds.
  const variantBgCombos = cartesian([variantNames, ["light", "dark"]]);

  // Determine whether Neovim-only or classic Vim colorscheme.
  // Only Neovim can run Lua scripts.
  const isNeovim = variantFiles.some((file) => file.endsWith(".lua"));

  const vcspgDir = join(process.cwd(), "vcspg");
  const initScript = join(vcspgDir, "init.vim");
  const sampleScript = join(vcspgDir, "IsHexColorLight.vim");

  const variants = (
    await Promise.all(
      variantBgCombos.map(async ([variantName, background]) => {
        // Spins up a Neovim instance. Loads the colorscheme and our extractor
        // script to Vim's runtime path, loads the sample script in the buffer,
        // then run the PrintColorValues command. This will print all color
        // groups to stderr, or print nothing in case the theme variant isn't
        // compatible with the current background.
        // --clean: start with defaults in non-compatible mode
        // -es: script mode, disables UI and messages
        // -u <script>: loads the extractor script as the init file
        const {stderr} = await exec(`
          nvim \
            --clean \
            -esu "${initScript}" \
            "+se bg=${background}" \
            "+se rtp+=${tmpColorschemeDir}" \
            "+PrintColorValues ${variantName} ${background}" \
            "+q" \
            "${sampleScript}"
        `);
        if (stderr) {
          const colors = JSON.parse(stderr);
          return {
            name: variantName,
            background,
            colorGroups: Object.entries(colors).map(([name, hexCode]) => ({
              name,
              hexCode,
            })),
          };
        }
      }),
    )
  ).filter(Boolean);

  if (!variants.length) {
    await rmTmpColorschemeDir();
    throw new Error(dedent`
      This Vim plugin does not have any colorschemes. Could not find any Lua or
      VimScript files containing colorscheme definitions inside the \`colors\`
      directory.
    `);
  }

  // Fetch this colorscheme's README file.
  // GitHub's GraphQL API provides no easy way to do this.
  let readme;
  try {
    readme = await readFile(join(tmpColorschemeDir, "README.md"), "utf8");
  } catch {}

  await rmTmpColorschemeDir();
  const {description, stargazerCount, url, createdAt, updatedAt, parent} =
    repository;
  return {
    name,
    owner,
    description,
    stars: stargazerCount,
    url,
    readme,
    createdAt,
    updatedAt,
    parent: {
      name: parent?.name,
      owner: parent?.owner.login,
    },
    isNeovim,
    variants,
  };
}

export async function getColorschemes(
  db,
  query,
  background,
  first,
  after,
  orderBy,
) {
  const collection = db.collection("colorschemes");
  const cursor = collection.find();

  if (query) {
    cursor.filter({
      $text: {
        $search: query,
      },
    });
  }

  if (background) {
    cursor.filter({
      variants: {
        $elemMatch: {
          background: background.toLowerCase(),
        },
      },
    });
  }

  if (orderBy === "MOST_POPULAR") {
    cursor.sort({stars: -1});
  } else if (orderBy === "NEWEST") {
    cursor.sort({updatedAt: -1});
  }

  return forwardPaginationHelper(cursor, first, after);
}

export async function getColorscheme(db, id) {
  const collection = db.collection("colorschemes");
  const colorscheme = await collection.findOne({_id: translucid(id)});

  return withId(colorscheme);
}

export async function submitColorscheme(db, name, owner) {
  const collection = db.collection("colorschemes");
  const colorscheme = await scrapeColorscheme(name, owner);

  const submission = await collection.findOneAndUpdate(
    {name, owner},
    {$set: colorscheme},
    {upsert: true, returnDocument: "after"},
  );

  return withId(submission);
}
