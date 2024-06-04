import {usePreloadedQuery} from "react-relay";
import {useLoaderData, useNavigate} from "react-router-dom";
import {graphql} from "relay-runtime";
import Header from "@/components/Header";

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

  return (
    <div>
      <Header></Header>
    </div>
  );
}
