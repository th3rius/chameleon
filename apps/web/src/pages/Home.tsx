import {PreloadedQuery, usePreloadedQuery} from "react-relay";
import {useLoaderData} from "react-router-dom";
import {graphql} from "relay-runtime";
import Header from "@/components/Header";
import {Suspense} from "react";
import {HomeGetColorschemesQuery} from "./__generated__/HomeGetColorschemesQuery.graphql";
import Window from "@/components/Window";
import Preview from "../components/Preview";

function ColorschemesGrid() {
  const queryRef = useLoaderData() as PreloadedQuery<HomeGetColorschemesQuery>;

  const data = usePreloadedQuery<HomeGetColorschemesQuery>(
    graphql`
      query HomeGetColorschemesQuery($background: Background) {
        colorschemes(background: $background) {
          edges {
            node {
              id
              name
              variants {
                name
                background
                ...PreviewFragment
              }
            }
          }
        }
      }
    `,
    queryRef,
  );
  const colorschemeEdges = data.colorschemes.edges;

  return (
    <div className="colorschemes">
      {colorschemeEdges.map((colorschemeEdge) => {
        const mainVariant = colorschemeEdge.node.variants.find((variant) =>
          new RegExp(variant.name + "(.nvim)?", "i").test(
            colorschemeEdge.node.name,
          ),
        );
        const mainVariantDark = colorschemeEdge.node.variants.find(
          (variant) =>
            new RegExp(variant.name + "(.nvim)?", "i").test(
              colorschemeEdge.node.name,
            ) && variant.background === "DARK",
        );
        const [firstVariant] = colorschemeEdge.node.variants;

        return (
          <div key={colorschemeEdge.node.id}>
            <Window title="IsHexColorLight.vim">
              <Preview
                bufferName="IsHexColorLight.vim"
                colorscheme={mainVariantDark || mainVariant || firstVariant}
              />
            </Window>
          </div>
        );
      })}
      <style jsx>{`
        .colorschemes {
          display: grid;
          grid-template-columns: 100%;
          padding: 32px;
          gap: 42px;
        }

        @media (min-width: 992px) {
          .colorschemes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Header></Header>
      <Suspense fallback={"Carregando..."}>
        <ColorschemesGrid />
      </Suspense>
    </div>
  );
}
