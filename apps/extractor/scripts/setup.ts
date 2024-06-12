import "dotenv/config";
import db from "../src/db";
import ora from "ora";
import chalk from "chalk";
import {URL} from "url";

const {MONGODB_URI} = process.env;

async function setup() {
  const mongoDb = await db();
  const collection = mongoDb.collection("colorschemes");

  const {hostname, port, pathname} = new URL(MONGODB_URI!);
  ora(
    `Creating indexes on database ${chalk.cyan(pathname ?? "test")} at ${chalk.cyan(`${hostname}:${port}`)}...`,
  ).start();

  // Full-text search index
  await collection.createIndex({name: "text", owner: "text"});

  // Sort by most popular or most recent colorschemes
  await collection.createIndex({stars: -1});
  await collection.createIndex({updatedAt: -1});

  console.log("\nDatabase setup complete.");
}

setup().then(() => process.exit(0));
