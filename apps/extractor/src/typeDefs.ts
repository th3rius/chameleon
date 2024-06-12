export default `
  """
  An object with an ID.
  """
  interface Node {
    """
    ID of the object.
    """
    id: ID!
  }

  """
  Preview of a Vim colorscheme to be submitted to the database.
  """
  type ColorschemePreview {
    """
    The name of the GitHub repository of the colorscheme.
    """
    name: String!

    """
    The owner of the GitHub repository of the colorscheme.
    """
    owner: String!

    """
    The description of the GitHub repository of the colorscheme.
    """
    description: String!

    """
    Amount of GitHub stars.
    """
    stars: Int!

    """
    The HTTP URL for this project.
    """
    url: String!

    """
    The project's readme.
    """
    readme: String

    """
    Date and time of when the repository was created.
    """
    createdAt: String!

    """
    Date and time of when the repository was last updated.
    """
    updatedAt: String!

    """
    Indicates whether this is a Neovim vim colorscheme, or a regular Vim colorscheme.
    """
    isNeovim: Boolean!

    """
    A list of colorscheme variants.
    """
    variants: [Variant!]!
  }

  """
  A Vim colorscheme.
  """
  type Colorscheme implements Node {
    """
    Node ID of the colorscheme.
    """
    id: ID!

    """
    Name of the colorscheme's GitHub repository.
    """
    name: String!

    """
    Owner of the colorscheme's GitHub repository.
    """
    owner: String!

    """
    Description of the colorscheme's GitHub repository.
    """
    description: String!

    """
    The HTTP URL for this project.
    """
    url: String!

    """
    The project's readme.
    """
    readme: String

    """
    Amount of GitHub stars.
    """
    stars: Int!

    """
    Date and time of when the repository was created.
    """
    createdAt: String!

    """
    Date and time of when the repository was last updated.
    """
    updatedAt: String!

    """
    Indicates whether this is a Neovim vim colorscheme, or a regular Vim colorscheme.
    """
    isNeovim: Boolean!

    """
    A list of colorscheme variants.
    """
    variants: [Variant!]!
  }

  """
  A colorscheme variant.
  """
  type Variant {
    """
    Name of the variant.
    """
    name: String!

    """
    Indicates whether the variant uses a light or dark background.
    """
    background: Background!

    """
    A list of Vim color groups of the variant.
    """
    colorGroups: [ColorGroup!]!
  }

  """
  The background of a colorscheme's variant.
  """
  enum Background {
    """
    A light variant background.
    """
    LIGHT

    """
    A dark variant background.
    """
    DARK
  }

  """
  Type for a color group definition.
  """
  type ColorGroup {
    """
    Original vim color group name.
    """
    name: String!

    """
    Hex code for the color group.
    """
    hexCode: String!
  }

  """
  Information about pagination in a connection.
  """
  type PageInfo {
    """
    When paginating forwards, the cursor to continue.
    """
    endCursor: String

    """
    When paginating forwards, are there more items?
    """
    hasNextPage: Boolean!

    """
    When paginating backwards, are there more items?
    """
    hasPreviousPage: Boolean!

    """
    When paginating backwards, the cursor to continue.
    """
    startCursor: String
  }

  """
  An edge in a connection.
  """
  type ColorschemeEdge {
    """
    A cursor for use in pagination.
    """
    cursor: String!

    """
    The item at the end of the edge.
    """
    node: Colorscheme!
  }

  """
  The connection type for Colorscheme.
  """
  type ColorschemeConnection {
    """
    A list of edges.
    """
    edges: [ColorschemeEdge!]!

    """
    Information to aid in pagination.
    """
    pageInfo: PageInfo!
  }

  """
  Ordering options for colorscheme connections.
  """
  enum ColorschemeOrder {
    """
    Order colorschemes by number of GitHub stars.
    """
    MOST_POPULAR

    """
    Order colorschemes by latest GitHub commit.
    """
    NEWEST
  }

  """
  Editor filtering options for colorschemes.
  """
  enum EditorFilter {
    """
    Vim-compatible colorscheme.
    """
    VIM

    """
    Neovim colorscheme.
    """
    NEOVIM
  }

  type Query {
    """
    Scrape a colorscheme from GitHub.
    """
    preview(
      """
      The name of the GitHub repository.
      """
      name: String!

      """
      The owner of the GitHub repository.
      """
      owner: String!
    ): ColorschemePreview

    """
    Look up a colorscheme by its name and owner
    """
    colorscheme(
      """
      ID of the colorscheme.
      """
      id: ID!
    ): Colorscheme

    """
    Look up colorschemes
    """
    colorschemes(
      """
      The search string to look for.
      """
      query: String

      """
      Filter colorschemes that contains variants with this background.
      """
      background: Background

      """
      Filter colorschemes supported by this editor.
      """
      editor: EditorFilter

      """
      Returns the first _n_ elements from the list.
      """
      first: Int = 10

      """
      Returns the elements in the list that come after the specified cursor.
      """
      after: String

      """
      Ordering options for the returned colorschemes.
      """
      orderBy: ColorschemeOrder = MOST_POPULAR
    ): ColorschemeConnection!

    """
    Fetches an object given its ID.
    """
    node(
      """
      ID of the object.
      """
      id: ID!
    ): Node
  }

  type Mutation {
    """
    Scrape a colorscheme from GitHub, submit the addition or update of it to the database.
    """
    submit(
      """
      The name of the GitHub repository of the colorscheme.
      """
      name: String!

      """
      The owner of the GitHub repository of the colorscheme.
      """
      owner: String!
    ): Colorscheme
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
