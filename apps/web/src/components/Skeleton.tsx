export interface SkeletonProps {
  height?: string | number;
  width?: string | number;
}

export default function Skeleton({
  height = "100%",
  width = "100%",
}: SkeletonProps) {
  return (
    <div className="skeleton">
      <style jsx>{`
        .skeleton {
          height: ${(typeof height === "number" && `${height}px`) || height};
          width: ${(typeof width === "number" && `${width}px`) || width};
          background-image: linear-gradient(
            270deg,
            #fafafa,
            #eaeaea,
            #eaeaea,
            #fafafa
          );
          background-size: 400% 100%;
          animation: loading 8s ease-in-out infinite;
          border-radius: 4px;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }

          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
