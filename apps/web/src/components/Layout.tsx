import globalStyles from "@/styles/globals";
import {Outlet} from "react-router-dom";

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
