import {loadQuery} from "react-relay";
import relayEnvironment from "@/relayEnvironment";
import {LoaderFunctionArgs} from "react-router-dom";
import ColorschemeInfoQuery from "@/pages/Colorscheme/__generated__/ColorschemeInfoQuery.graphql";

export default function colorschemeLoader({params}: LoaderFunctionArgs) {
  const {id} = params;
  return loadQuery(relayEnvironment, ColorschemeInfoQuery, {
    id: decodeURIComponent(id!),
  });
}
