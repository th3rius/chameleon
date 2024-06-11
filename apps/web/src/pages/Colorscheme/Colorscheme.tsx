import Header from "@/components/Header";
import {Suspense} from "react";
import ColorschemeInfo from "./ColorschemeInfo";
import ColorschemeInfoSkeleton from "./ColorschemeInfoSkeleton";

export default function Colorscheme() {
  return (
    <div>
      <Header hideFilters />
      <Suspense fallback={<ColorschemeInfoSkeleton />}>
        <ColorschemeInfo />
      </Suspense>
    </div>
  );
}
