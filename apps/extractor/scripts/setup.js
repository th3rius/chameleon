import "dotenv/config";
import db from "../src/db";
import ora from "ora";
import {cyan} from "chalk";
import url from "url";

const {MONGODB_URI} = process.env;

async function setup() {
  const mongoDb = await db();
  const collection = mongoDb.collection("colorschemes");

  const {hostname, port, pathname} = url.parse(MONGODB_URI);
  ora(
    `Creating indexes on database ${cyan(pathname ?? "test")} at ${cyan(`${hostname}:${port}`)}...`,
  ).start();

  // Full-text search index
  await collection.createIndex({name: "text", owner: "text"});

  // Sort by most popular or most recent colorschemes
  await collection.createIndex({stars: -1});
  await collection.createIndex({updatedAt: -1});

  console.log("\nDatabase setup complete.");
}

setup().then(() => process.exit(0));
