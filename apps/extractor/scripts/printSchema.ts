import {printSchema} from "graphql";
import schema from "../src/schema";

console.log("# @generated\n\n" + printSchema(schema));
