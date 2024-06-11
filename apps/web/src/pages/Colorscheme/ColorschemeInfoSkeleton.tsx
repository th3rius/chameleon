import Skeleton from "@/components/Skeleton";

export default function ColorschemeInfoSkeleton() {
  return (
    <div className="info">
      <Skeleton height={36} width="25%" />
      <div className="preview">
        <Skeleton height={366} width="100%" />
      </div>

      <style jsx>{`
        .info {
          width: 100%;
          max-width: 80rem;
          margin: 0 auto;
          padding: 32px;
          margin-bottom: 32px;
        }

        .preview {
          margin-top: 32px;
        }
      `}</style>
    </div>
  );
}
