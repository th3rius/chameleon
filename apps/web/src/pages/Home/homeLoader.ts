import {loadQuery} from "react-relay";
import relayEnvironment from "@/relayEnvironment";
import {LoaderFunctionArgs} from "react-router-dom";
import ColorschemesGridQuery from "@/pages/Home/__generated__/ColorschemesGridQuery.graphql";

export default function homeLoader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);
  const background = searchParams.get("bg");
  const sort = searchParams.get("s");
  const query = searchParams.get("q");
  const editor = searchParams.get("e");

  return loadQuery(relayEnvironment, ColorschemesGridQuery, {
    query,

    background:
      (background === "light" && "LIGHT") ||
      (background === "dark" && "DARK") ||
      undefined,

    orderBy:
      (sort === "popular" && "MOST_POPULAR") ||
      (sort === "newest" && "NEWEST") ||
      undefined,

    editor:
      (editor === "vim" && "VIM") ||
      (editor === "neovim" && "NEOVIM") ||
      undefined,
  });
}
