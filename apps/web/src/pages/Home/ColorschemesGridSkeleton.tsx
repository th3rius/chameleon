import Skeleton from "@/components/Skeleton";

export default function ColorschemesGridSkeleton() {
  const skeletons = Array.from({length: 20}).map((_skeleton, i) => i);

  return (
    <div className="colorschemes">
      {skeletons.map((i) => (
        <div key={i}>
          <Skeleton height={364} />
          <div className="skeleton-info">
            <Skeleton width="50%" height={36} />
          </div>
        </div>
      ))}

      <style jsx>{`
        .colorschemes {
          display: grid;
          grid-template-columns: 100%;
          padding: 32px;
          gap: 48px;
          margin-bottom: 32px;
        }

        .skeleton-info {
          height: 84px;
          margin-top: 40px;
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
