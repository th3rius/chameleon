import {usePreloadedQuery} from "react-relay";
import {useLoaderData, useNavigate} from "react-router-dom";
import {graphql} from "relay-runtime";

export default function Home() {
  const navigate = useNavigate();
  const queryRef = useLoaderData();

  const data = usePreloadedQuery(
    graphql`
      query HomeGetColorschemesQuery {
        colorscheme(id: "ZlYWGtrJpgd/nplC") {
          id
          name
          variants {
            ...CodeSnippetFragment
          }
        }
      }
    `,
    // @ts-ignore
    queryRef,
  );

  // @ts-ignore
  const colorscheme = data.colorscheme;

  return <div onClick={() => navigate("/test")}>sair</div>;
}
