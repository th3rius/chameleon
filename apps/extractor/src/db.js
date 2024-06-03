import {MongoClient} from "mongodb";
import dedent from "ts-dedent";

const {MONGODB_URI} = process.env;

export default async function db() {
  if (!MONGODB_URI) {
    throw new Error(dedent`
      Invalid configuration: no MongoDB connection string was provided.
      Check if the environment variable \`MONGODB_URI\` is configured.
    `);
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  return client.db();
}
