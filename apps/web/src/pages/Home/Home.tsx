import Header from "@/components/Header";
import {Suspense} from "react";
import ColorschemesGridSkeleton from "./ColorschemesGridSkeleton";
import ColorschemesGrid from "./ColorschemesGrid";
import Button from "@/components/Button";
import UploadIcon from "@/assets/upload.svg";

export default function Home() {
  return (
    <div>
      <Header />
      <Suspense fallback={<ColorschemesGridSkeleton />}>
        <ColorschemesGrid />
      </Suspense>
      <div className="floating">
        <Button suffix={<UploadIcon />}>Submit</Button>
      </div>

      <style jsx>{`
        .floating {
          position: fixed;
          right: 0;
          bottom: 0;
          padding: 32px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
