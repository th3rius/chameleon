import {ObjectId} from "mongodb";

/**
 * Parses an opaque ID to an usable value.
 * Get it? The opposite of opaque?
 */
export default function translucid(id) {
  try {
    return ObjectId.createFromBase64(id);
  } catch {}
}
