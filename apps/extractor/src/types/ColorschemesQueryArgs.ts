export default interface ColorschemesQueryArgs {
  query?: string;
  background?: "light" | "dark";
  first: number;
  after?: string;
  orderBy?: "MOST_POPULAR" | "NEWEST";
}
