import {
  scrapeColorscheme,
  submitColorscheme,
  getColorschemes,
  getColorscheme,
} from "./colorschemes";
import type {GraphQLObjectType} from "graphql";
import PreviewQueryArgs from "./types/PreviewQueryArgs";
import ColorschemeQueryArgs from "./types/ColorschemeQueryArgs";
import AppContext from "./types/AppContext";
import ColorschemesQueryArgs from "./types/ColorschemesQueryArgs";
import NodeQueryArgs from "./types/NodeQueryArgs";
import {SubmitMutationArgs} from "./types/SubmitMutationArgs";
import Background from "./types/Background";
import ColorschemeOrder from "./types/ColorschemeOrder";
import EditorFilter from "./types/EditorFilter";

export default {
  Query: {
    /**
     * Scrape and preview an colorscheme from GitHub.
     */
    preview: (_parent: GraphQLObjectType, args: PreviewQueryArgs) =>
      scrapeColorscheme(args),

    /**
     * Fetches an colorscheme from the database.
     */
    colorscheme: (
      _parent: GraphQLObjectType,
      args: ColorschemeQueryArgs,
      {db}: AppContext,
    ) => getColorscheme(db, args),

    /**
     * Look up colorschemes.
     */
    colorschemes: (
      _parent: GraphQLObjectType,
      args: ColorschemesQueryArgs,
      {db}: AppContext,
    ) => getColorschemes(db, args),

    /**
     * Retrieves a node.
     */
    node: async (
      _parent: GraphQLObjectType,
      args: NodeQueryArgs,
      {db}: AppContext,
    ) => {
      const colorscheme = await getColorscheme(db, args);
      if (colorscheme) {
        return {
          ...colorscheme,
          // `Colorscheme` is the only type that implements `Node`.
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
    submit: (
      _parent: GraphQLObjectType,
      args: SubmitMutationArgs,
      {db}: AppContext,
    ) => submitColorscheme(db, args),
  },

  /**
   * Background enum.
   */
  Background,

  /**
   * EditorFilter enum.
   */
  EditorFilter,

  /**
   * ColorscheemOrder enum.
   */
  ColorschemeOrder,
};
