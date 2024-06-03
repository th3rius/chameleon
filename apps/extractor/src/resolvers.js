import {
  scrapeColorscheme,
  submitColorscheme,
  getColorschemes,
  getColorscheme,
} from "./colorschemes";

export default {
  Query: {
    /**
     * Scrape and preview an colorscheme from GitHub.
     */
    preview: (_parent, {name, owner}) => scrapeColorscheme(name, owner),

    /**
     * Fetches an colorscheme from the database.
     */
    colorscheme: (_parent, {id}, {db}) => getColorscheme(db, id),

    /**
     * Look up colorschemes.
     */
    colorschemes: (_parent, {query, background, first, after, orderBy}, {db}) =>
      getColorschemes(db, query, background, first, after, orderBy),

    /**
     * Retrieves a node.
     */
    node: async (_parent, {id}, {db}) => {
      const colorscheme = await getColorscheme(db, id);
      if (colorscheme) {
        return {
          ...colorscheme,
          // `Colorscheme` is the only type that implenets `Node`.
          // All nodes are colorschemes.
          __typename: "Colorscheme",
        };
      }
    },
  },

  Mutation: {
    /**
     * Submits a colorscheme to the database.
     */
    submit: (_parent, {name, owner}, {db}) =>
      submitColorscheme(db, name, owner),
  },

  /**
   * Background enum.
   */
  Background: {
    LIGHT: "light",
    DARK: "dark",
  },
};
