import type {ObjectId} from "mongodb";

/**
 * Makes and ID opaque.
 */
export default function opaque(id?: ObjectId) {
  return id?.toString("base64");
}
