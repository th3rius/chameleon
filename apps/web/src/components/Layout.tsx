import globalStyles from "@/styles/globals";
import {Outlet} from "react-router-dom";
import "@fontsource/iosevka";
import "@fontsource/iosevka-aile";
import "@fontsource/iosevka-aile/500.css";
import "@fontsource/iosevka-aile/700.css";

export default function Layout() {
  return (
    <div>
      <Outlet />

      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}
