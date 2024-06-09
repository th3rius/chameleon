import {PreloadedQuery, graphql, usePreloadedQuery} from "react-relay";
import {Navigate, useLoaderData} from "react-router-dom";
import {ColorschemeInfoQuery} from "./__generated__/ColorschemeInfoQuery.graphql";
import StarIcon from "@/assets/star.svg";
import {formatDistanceToNow} from "date-fns";
import Preview from "@/components/Preview";
import Tip from "@/components/Tip";
import GithubIcon from "@/assets/github.svg";

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
            ...TipFragment
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

  return (
    <div className="info">
      <div className="owner-and-stars">
        <span>{colorscheme.owner}</span>
        <div className="stars">
          <StarIcon />
          <span>{colorscheme.stars}</span>
        </div>
      </div>
      <div className="name-and-tips">
        <h2 className="name">{colorscheme.name}</h2>
        {colorscheme.variants.length > 1 && (
          <div className="tips">
            {colorscheme.variants.map((variant) => (
              <Tip variant={variant} />
            ))}
          </div>
        )}
      </div>
      <p>{colorscheme.description}</p>
      <span>
        last commit{" "}
        <strong>{formatDistanceToNow(colorscheme.updatedAt)}</strong> ago
      </span>
      <a className="github" href={colorscheme.url} target="_blank">
        view{" "}
        <strong>
          {colorscheme.owner}/{colorscheme.name}
        </strong>{" "}
        on GitHub <GithubIcon />
      </a>
      <div className="colorschemes">
        <Preview bufferName="IsHexColorLight.vim" colorscheme={colorscheme} />
        <Preview bufferName="IsHexColorLight.vim" colorscheme={colorscheme} />
      </div>

      <style jsx>{`
        .info {
          max-width: 80rem;
          margin: 0 auto;
          padding: 32px;
          margin-bottom: 32px;
        }

        .name-and-tips {
          display: flex;
          justify-content: space-between;
        }

        .tips {
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
          margin: 32px 0;
          display: grid;
          gap: 2rem;
        }

        .switcher {
          margin: 32px 0;
          border-radius: 8px;
          border: 1px solid rgb(0 0 0 / 8%);
          padding: 1.5rem;
          width: min-content;
          display: flex;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .colorschemes:not(:has(> :only-child)) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <style jsx global>{`
        .github {
          display: block;
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
