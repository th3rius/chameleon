import {PreloadedQuery, graphql, usePreloadedQuery} from "react-relay";
import {Navigate, useLoaderData} from "react-router-dom";
import {ColorschemeInfoQuery} from "./__generated__/ColorschemeInfoQuery.graphql";
import StarIcon from "@/assets/star.svg";
import {formatDistanceToNow} from "date-fns";
import Preview from "@/components/Preview";
import Brick from "@/components/Brick";
import GithubIcon from "@/assets/github.svg";
import useInferMainVariant from "@/hooks/inferMainVariant";

export default function ColorschemeInfo() {
  const queryRef = useLoaderData() as PreloadedQuery<ColorschemeInfoQuery>;

  const {colorscheme} = usePreloadedQuery(
    graphql`
      query ColorschemeInfoQuery($id: ID!) {
        colorscheme(id: $id) {
          owner
          name
          description
          stars
          url
          updatedAt
          variants {
            ...BrickFragment
          }
          ...PreviewFragment
        }
      }
    `,
    queryRef,
  );

  if (!colorscheme) {
    return <Navigate to="/" />;
  }

  const mainVariantDark = useInferMainVariant(colorscheme, "dark");
  const mainVariantLight = useInferMainVariant(colorscheme, "light");
  const hasDarkAndLightVariants = mainVariantDark !== mainVariantLight;

  return (
    <div className="info">
      <div className="owner-and-stars">
        <span>{colorscheme.owner}</span>
        <div className="stars">
          <StarIcon />
          <span>{colorscheme.stars}</span>
        </div>
      </div>
      <div className="name-and-bricks">
        <h2 className="name">{colorscheme.name}</h2>
        {colorscheme.variants.length > 1 && (
          <div className="bricks">
            {colorscheme.variants.map((variant, i) => (
              <Brick variant={variant} key={i} />
            ))}
          </div>
        )}
      </div>
      <p>{colorscheme.description}</p>
      <span>
        last commit{" "}
        <strong>{formatDistanceToNow(colorscheme.updatedAt)}</strong> ago
      </span>
      <br />
      <a className="github" href={colorscheme.url} target="_blank">
        view{" "}
        <strong>
          {colorscheme.owner}/{colorscheme.name}
        </strong>{" "}
        on GitHub <GithubIcon />
      </a>
      <div className="colorschemes">
        <Preview colorscheme={colorscheme} mainVariant={mainVariantDark} />
        {hasDarkAndLightVariants && (
          <Preview colorscheme={colorscheme} mainVariant={mainVariantLight} />
        )}
      </div>

      <style jsx>{`
        .info {
          max-width: 80rem;
          margin: 0 auto;
          padding: 32px;
          margin-bottom: 32px;
        }

        .name-and-bricks {
          display: flex;
          justify-content: space-between;
        }

        .bricks {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          padding-top: 6px;
          gap: 0.3rem;
        }

        .owner-and-stars {
          display: flex;
          justify-content: space-between;
        }

        .name {
          margin: 0;
          flex: 1;
        }

        .colorschemes {
          margin-top: 16px;
          margin-bottom: 32px;
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          ${hasDarkAndLightVariants &&
          `.colorschemes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }`}
        }
      `}</style>

      <style jsx global>{`
        .github {
          display: inline-block;
          margin: 16px 0;
          color: black;
          text-decoration: none;
        }

        @media (hover: hover) {
          .github:hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
}
