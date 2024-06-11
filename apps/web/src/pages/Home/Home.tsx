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
    <>
      <Header />
      <div className="container">
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
      </div>

      <style jsx>{`
        .container {
          padding: 32px;
          margin-bottom: 32px;
        }

        .floating {
          position: fixed;
          right: 0;
          bottom: 0;
          margin: 32px;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}
