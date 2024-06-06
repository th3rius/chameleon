import {loadQuery, RelayEnvironmentProvider} from "react-relay";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import relayEnvironment from "./relayEnvironment";
import ColorschemesGridQuery from "./pages/Home/__generated__/ColorschemesGridQuery.graphql";
import globalStyles from "./globalStyles";

function homeLoader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);
  const backgroundFilter = searchParams.get("bg");
  return loadQuery(relayEnvironment, ColorschemesGridQuery, {
    background:
      (backgroundFilter === "light" && "LIGHT") ||
      (backgroundFilter === "dark" && "DARK") ||
      undefined,
  });
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} loader={homeLoader}></Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </RelayEnvironmentProvider>

    <style jsx global>
      {globalStyles}
    </style>
  </>,
);
