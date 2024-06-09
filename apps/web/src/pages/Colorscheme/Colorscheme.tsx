import Header from "@/components/Header";
import {Suspense} from "react";
import ColorschemeInfo from "./ColorschemeInfo";

export default function Colorscheme() {
  return (
    <div>
      <Header hideFilters />
      <Suspense>
        <ColorschemeInfo />
      </Suspense>
    </div>
  );
}
