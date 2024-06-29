import "dotenv/config";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import bodyParser from "body-parser";
import cors from "cors";
import {createHandler} from "graphql-http/lib/use/express";
import db from "./db";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";
import morgan from "morgan";

const isProduction = process.env.NODE_ENV === "production";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default async function app() {
  const app = express();
  app.use(morgan(isProduction ? "tiny" : "dev"));

  app.use(cors());
  app.use(bodyParser.json());

  app.all(
    "/graphql",
    createHandler({
      schema,
      context: {
        db: await db(),
      },
    }),
  );
  app.all(
    "/playground",
    expressPlayground({
      endpoint: isProduction
        ? // Takes API gateways' route into consideration
          "/default/graphql"
        : "graphql",
    }),
  );

  return app;
}
