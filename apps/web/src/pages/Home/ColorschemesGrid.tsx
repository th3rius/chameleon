import {formatDistanceToNow} from "date-fns";
import {
  PreloadedQuery,
  useFragment,
  usePaginationFragment,
  usePreloadedQuery,
} from "react-relay";
import {useLoaderData, Link, useSearchParams} from "react-router-dom";
import {graphql} from "relay-runtime";
import Preview from "@/components/Preview";
import {ColorschemesGridQuery} from "./__generated__/ColorschemesGridQuery.graphql";
import StarIcon from "@/assets/star.svg";
import Brick from "@/components/Brick";
import {ColorschemesGridFragment$key} from "./__generated__/ColorschemesGridFragment.graphql";
import InfiniteScrollTrigger from "@/components/InfiniteScrollTrigger";
import ColorschemesGridSkeleton from "./ColorschemesGridSkeleton";
import {useTransition} from "react";
import useInferMainVariant from "@/hooks/inferMainVariant";
import {ColorschemesGridColorschemeFragment$key} from "./__generated__/ColorschemesGridColorschemeFragment.graphql";
import useNavigationChange from "@/hooks/useNavigationChange";

export default function ColorschemesGrid() {
  const queryRef = useLoaderData() as PreloadedQuery<ColorschemesGridQuery>;

  useNavigationChange(() => queryRef.dispose());

  const data = usePreloadedQuery<ColorschemesGridQuery>(
    graphql`
      query ColorschemesGridQuery(
        $background: Background
        $orderBy: ColorschemeOrder
        $query: String
        $editor: EditorFilter
      ) {
        ...ColorschemesGridFragment
          @arguments(
            background: $background
            orderBy: $orderBy
            query: $query
            editor: $editor
          )
      }
    `,
    queryRef,
  );

  return <ColorschemesGridPaginationContainer colorschemes={data} />;
}

interface PaginationContainerProps {
  colorschemes: ColorschemesGridFragment$key;
}

function ColorschemesGridPaginationContainer({
  colorschemes,
}: PaginationContainerProps) {
  const {data, loadNext} = usePaginationFragment(
    graphql`
      fragment ColorschemesGridFragment on Query
      @refetchable(queryName: "ColorschemesGridPaginationQuery")
      @argumentDefinitions(
        count: {type: "Int"}
        cursor: {type: "String"}
        background: {type: "Background"}
        orderBy: {type: "ColorschemeOrder"}
        query: {type: "String"}
        editor: {type: "EditorFilter"}
      ) {
        colorschemes(
          background: $background
          orderBy: $orderBy
          query: $query
          editor: $editor
          first: $count
          after: $cursor
        ) @connection(key: "ColorschemesGridFragment_colorschemes") {
          edges {
            node {
              id
              ...ColorschemesGridColorschemeFragment
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
    colorschemes,
  );
  const [isPending, startTransition] = useTransition();
  const loadMore = () => startTransition(() => void loadNext(10));

  const colorschemeEdges = data.colorschemes.edges;
  const hasNextPage = data.colorschemes.pageInfo.hasNextPage;

  if (!colorschemeEdges.length) {
    return <span>No colorschemes found.</span>;
  }

  return (
    <>
      <div className="colorschemes">
        {colorschemeEdges.map(({node}) => (
          <Colorscheme colorscheme={node} key={node.id} />
        ))}
      </div>

      <div className="next-page">
        <InfiniteScrollTrigger
          onEndReached={loadMore}
          hasNext={hasNextPage}
          isLoadingNext={isPending}
          Loading={<ColorschemesGridSkeleton />}
        />
      </div>

      <style jsx>{`
        .colorschemes {
          display: grid;
          grid-template-columns: 100%;
          gap: 48px;
        }

        @media (min-width: 992px) {
          .colorschemes {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}

interface ColorschemeProps {
  colorscheme: ColorschemesGridColorschemeFragment$key;
}

function Colorscheme({colorscheme}: ColorschemeProps) {
  const data = useFragment(
    graphql`
      fragment ColorschemesGridColorschemeFragment on Colorscheme {
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
    `,
    colorscheme,
  );

  const [searchParams] = useSearchParams();
  const backgroundFilter = searchParams.get("bg") || "all";
  const backgroundToDisplay =
    (backgroundFilter === "all" && "dark") || backgroundFilter || "dark";
  const mainVariant = useInferMainVariant(data, backgroundToDisplay);

  return (
    <Link
      to={`/${encodeURIComponent(data.id)}`}
      className="preview"
      key={data.id}
    >
      <Preview colorscheme={data} mainVariant={mainVariant} />
      <div className="info">
        <div className="owner-and-stars">
          <span>{data.owner}</span>
          <div className="stars">
            <StarIcon />
            <span>{data.stars}</span>
          </div>
        </div>
        <div className="name-and-bricks">
          <h2 className="name">{data.name}</h2>
          {data.variants.length > 1 && (
            <div className="bricks">
              {data.variants.map((variant, i) => (
                <Brick key={i} variant={variant} />
              ))}
            </div>
          )}
        </div>
        <span>
          last commit <strong>{formatDistanceToNow(data.updatedAt)}</strong> ago
        </span>
      </div>

      <style jsx>{`
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

        .next-page {
          margin-top: 42px;
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
    </Link>
  );
}
