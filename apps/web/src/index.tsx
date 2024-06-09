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
import ColorschemeInfoQuery from "./pages/Colorscheme/__generated__/ColorschemeInfoQuery.graphql";
import Colorscheme from "./pages/Colorscheme";
import Layout from "./components/Layout";

function homeLoader({request}: LoaderFunctionArgs) {
  const {searchParams} = new URL(request.url);
  const backgroundFilter = searchParams.get("bg");
  const sort = searchParams.get("s");
  const query = searchParams.get("q");

  return loadQuery(relayEnvironment, ColorschemesGridQuery, {
    query,

    background:
      (backgroundFilter === "light" && "LIGHT") ||
      (backgroundFilter === "dark" && "DARK") ||
      undefined,

    orderBy:
      (sort === "popular" && "MOST_POPULAR") ||
      (sort === "newest" && "NEWEST") ||
      undefined,
  });
}

function colorschemeLoader({params}: LoaderFunctionArgs) {
  const {id} = params;
  return loadQuery(relayEnvironment, ColorschemeInfoQuery, {id});
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} loader={homeLoader} />
      <Route path=":id" element={<Colorscheme />} loader={colorschemeLoader} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <>
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </RelayEnvironmentProvider>
  </>,
);
