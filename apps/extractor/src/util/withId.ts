import opaque from "./opaque";
import type {Document, WithId} from "mongodb";

/**
 * Adds and `id` field to an mongo document and makes it opaque.
 * Removes `_id`.
 */
export default function withId(document: WithId<Document> | null) {
  if (document) {
    const {_id, ...documentWithoutId} = document;
    return {...documentWithoutId, id: opaque(_id)};
  }
}
