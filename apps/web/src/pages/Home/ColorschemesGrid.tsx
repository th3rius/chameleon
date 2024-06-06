import {formatDistanceToNow} from "date-fns";
import {PreloadedQuery, usePreloadedQuery} from "react-relay";
import {useLoaderData, Link} from "react-router-dom";
import {graphql} from "relay-runtime";
import Preview from "@/components/Preview";
import inferMainColorscheme from "@/pages/Home/inferMainColorscheme";
import {ColorschemesGridQuery} from "./__generated__/ColorschemesGridQuery.graphql";
import StarIcon from "@/assets/star.svg";

export default function ColorschemesGrid() {
  const queryRef = useLoaderData() as PreloadedQuery<ColorschemesGridQuery>;

  const data = usePreloadedQuery<ColorschemesGridQuery>(
    graphql`
      query ColorschemesGridQuery($background: Background) {
        colorschemes(background: $background) {
          edges {
            node {
              id
              owner
              name
              description
              stars
              updatedAt
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
      {colorschemeEdges.map(({node}) => {
        return (
          <Link key={node.id} className="colorscheme-preview">
            <Preview
              bufferName="IsHexColorLight.vim"
              colorscheme={inferMainColorscheme(node)}
            />
            <div className="colorscheme-info">
              <div className="owner-and-stars">
                <span>{node.owner}</span>
                <div className="stars">
                  <StarIcon />
                  <span>{node.stars}</span>
                </div>
              </div>
              <h2 className="name">{node.name}</h2>
              <span className="last-commit">
                last commit{" "}
                <strong>{formatDistanceToNow(node.updatedAt)}</strong> ago
              </span>
            </div>
          </Link>
        );
      })}

      <style jsx>{`
        .colorschemes {
          display: grid;
          grid-template-columns: 100%;
          padding: 32px;
          gap: 30px;
        }

        .colorscheme-info {
          margin-top: 16px;
        }

        .owner-and-stars {
          display: flex;
          justify-content: space-between;
        }

        .stars {
          display: flex;
          align-items: center;
        }

        .name {
          margin: 0;
        }

        @media (min-width: 992px) {
          .colorschemes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <style jsx global>{`
        .colorscheme-preview {
          border-radius: 4px;
          cursor: pointer;
          padding: 12px;
          color: inherit;
          text-decoration: none;
        }

        @media (hover: hover) {
          .colorscheme-preview:hover .name {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
}
