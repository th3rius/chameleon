import {formatDistanceToNow} from "date-fns";
import {PreloadedQuery, usePreloadedQuery} from "react-relay";
import {useLoaderData, Link} from "react-router-dom";
import {graphql} from "relay-runtime";
import Preview from "@/components/Preview";
import {ColorschemesGridQuery} from "./__generated__/ColorschemesGridQuery.graphql";
import StarIcon from "@/assets/star.svg";
import Brick from "@/components/Brick";

export default function ColorschemesGrid() {
  const queryRef = useLoaderData() as PreloadedQuery<ColorschemesGridQuery>;

  const data = usePreloadedQuery<ColorschemesGridQuery>(
    graphql`
      query ColorschemesGridQuery(
        $background: Background
        $orderBy: ColorschemeOrder
        $query: String
      ) {
        colorschemes(
          background: $background
          orderBy: $orderBy
          query: $query
        ) {
          edges {
            node {
              id
              owner
              name
              stars
              updatedAt
              ...PreviewFragment
              variants {
                ...BrickFragment
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
          <Link
            to={`/${encodeURIComponent(node.id)}`}
            className="preview"
            key={node.id}
          >
            <Preview colorscheme={node} />
            <div className="info">
              <div className="owner-and-stars">
                <span>{node.owner}</span>
                <div className="stars">
                  <StarIcon />
                  <span>{node.stars}</span>
                </div>
              </div>
              <div className="name-and-bricks">
                <h2 className="name">{node.name}</h2>
                {node.variants.length > 1 && (
                  <div className="bricks">
                    {node.variants.map((variant) => (
                      <Brick variant={variant} />
                    ))}
                  </div>
                )}
              </div>
              <span>
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
          gap: 48px;
          margin-bottom: 32px;
        }

        .info {
          margin-top: 16px;
        }

        .owner-and-stars {
          display: flex;
          justify-content: space-between;
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

        .stars {
          display: flex;
          align-items: center;
        }

        .name {
          margin: 0;
          flex: 1;
        }

        @media (min-width: 992px) {
          .colorschemes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>

      <style jsx global>{`
        a.preview {
          border-radius: 4px;
          cursor: pointer;
          color: inherit;
          text-decoration: none;
        }

        @media (hover: hover) {
          .preview:hover .name {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  );
}
