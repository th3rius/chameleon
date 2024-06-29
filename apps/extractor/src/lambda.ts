import app from "./app";
import type {Handler} from "aws-lambda";
import serverlessExpress from "@codegenie/serverless-express";

let serverlessExpressApp: any;

export const handler: Handler = async (event, context) => {
  if (!serverlessExpressApp) {
    const expressApp = await app();
    serverlessExpressApp = serverlessExpress({app: expressApp});
  }

  return serverlessExpressApp(event, context);
};
