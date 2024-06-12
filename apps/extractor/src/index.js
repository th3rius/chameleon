import "dotenv/config";
import Koa from "koa";
import koaRouter from "koa-router";
import http from "http";
import koaPlayground from "graphql-playground-middleware-koa";
import {bodyParser} from "@koa/bodyparser";
import cors from "@koa/cors";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {graphqlHTTP} from "koa-graphql";
import db from "./db";
import {cyan} from "chalk";
import logger from "koa-logger";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

async function bootstrap() {
  const app = new Koa();
  const router = new koaRouter();

  const PORT = Number(process.env.PORT || 4000);
  const HOST = process.env.HOST || "localhost";

  router.all(
    "/graphql",
    graphqlHTTP({
      schema,
      context: {
        db: await db(),
      },
    }),
  );
  router.all(
    "/playground",
    koaPlayground({
      endpoint: "/graphql",
    }),
  );

  app.use(logger());
  app.use(cors());
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  const server = http.createServer(app.callback());
  server.listen(PORT, HOST, () => {
    const {address, port} = server.address();
    console.log(
      `Server is running at ${cyan(`http://${address}:${port}`)}! 👾`,
    );
  });
}

bootstrap();
