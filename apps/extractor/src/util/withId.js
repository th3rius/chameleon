import opaque from "./opaque";

/**
 * Adds and `id` field to an mongo document and makes it opaque.
 * Removes `_id`.
 */
export default function withId(document) {
  if (document) {
    const {_id, ...documentWithoutId} = document;
    return {...documentWithoutId, id: opaque(_id)};
  }
}
