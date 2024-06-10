import ColorschemesGridQuery from "./pages/Home/__generated__/ColorschemesGridQuery.graphql";
import ColorschemeInfoQuery from "./pages/Colorscheme/__generated__/ColorschemeInfoQuery.graphql";
import Colorscheme from "./pages/Colorscheme";
import Layout from "./components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import {loadQuery, RelayEnvironmentProvider} from "react-relay";
import relayEnvironment from "./relayEnvironment";

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

export default function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <RouterProvider router={router} />
    </RelayEnvironmentProvider>
  );
}
