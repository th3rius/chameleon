import type {Db} from "mongodb";

export default interface AppContext {
  db: Db;
}
