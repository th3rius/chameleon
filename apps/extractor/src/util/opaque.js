/**
 * Makes and ID opaque.
 */
export default function opaque(id) {
  return id?.toString("base64");
}
