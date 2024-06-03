import translucid from "./translucid";
import opaque from "./opaque";
import withId from "./withId";

export default async function forwardPaginationHelper(cursor, first, after) {
  cursor.limit(first + 1);

  if (after) {
    cursor.filter({_id: {$gt: translucid(after)}});
  }

  const documents = await cursor.toArray();
  const pageSize = documents.length;
  const firstNode = documents[0];
  const lastNode = documents[pageSize - 1];

  // This is a trick to determine whether or not a next page is available:
  // Fetch one more extra document than requested to check if pagination can
  // continue, then remove it from the results if so.
  // Otherwise if `pageSize` is smaller than `first`, there will only be at
  // most `pageSize` items.
  const hasNextPage = pageSize > first;
  if (hasNextPage) {
    documents.pop();
  }

  return {
    edges: documents.map((document) => ({
      cursor: opaque(document._id),
      node: withId(document),
    })),
    pageInfo: {
      endCursor: opaque(lastNode?._id),
      hasNextPage,
      // The relay server specification requires this field to be present, but
      // populating it is optional, and it is not very useful when paginating
      // forward.
      hasPreviousPage: false,
      startCursor: opaque(firstNode?._id),
    },
  };
}
