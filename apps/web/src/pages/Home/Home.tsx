import Header from "@/components/Header";
import {Suspense, useState} from "react";
import ColorschemesGridSkeleton from "./ColorschemesGridSkeleton";
import ColorschemesGrid from "./ColorschemesGrid";
import Button from "@/components/Button";
import UploadIcon from "@/assets/upload.svg";
import SubmitColorscheme from "@/components/SubmitColorscheme";

export default function Home() {
  const [submitModalActive, setSubmitModalActive] = useState(false);

  return (
    <div>
      <Header />
      <Suspense fallback={<ColorschemesGridSkeleton />}>
        <ColorschemesGrid />
      </Suspense>
      <div className="floating" onClick={() => setSubmitModalActive(true)}>
        <Button suffix={<UploadIcon />}>Submit</Button>
      </div>
      <SubmitColorscheme
        active={submitModalActive}
        onClose={() => setSubmitModalActive(false)}
      />

      <style jsx>{`
        .floating {
          position: fixed;
          right: 0;
          bottom: 0;
          margin: 32px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
