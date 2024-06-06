import Header from "@/components/Header";
import {Suspense} from "react";
import ColorschemesSkelectonGrid from "./ColorschemesSkeletonGrid";
import ColorschemesGrid from "./ColorschemesGrid";

export default function Home() {
  return (
    <>
      <Header />
      <Suspense fallback={<ColorschemesSkelectonGrid />}>
        <ColorschemesGrid />
      </Suspense>
    </>
  );
}
