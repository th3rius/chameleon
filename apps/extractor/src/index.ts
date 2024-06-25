import "dotenv/config";
import express from "express";
import http from "http";
import expressPlayground from "graphql-playground-middleware-express";
import bodyParser from "body-parser";
import cors from "cors";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {createHandler} from "graphql-http/lib/use/express";
import db from "./db";
import chalk from "chalk";
import morgan from "morgan";
import type {AddressInfo} from "net";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function bootstrap() {
  const app = express();

  const PORT = Number(process.env.PORT || 4000);
  const HOST = process.env.HOST || "localhost";

  app.use(morgan("dev"));
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
      endpoint: "/graphql",
    }),
  );

  const server = http.createServer(app);
  server.listen(PORT, HOST, () => {
    const {address, port} = server.address() as AddressInfo;
    console.log(
      `Server is running at ${chalk.cyan(`http://${address}:${port}`)}! 👾`,
    );
  });
}

bootstrap();
