import Layout from "./components/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {RelayEnvironmentProvider} from "react-relay";
import relayEnvironment from "./relayEnvironment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index lazy={() => import("./pages/Home")} />
      <Route path=":id" lazy={() => import("./pages/Colorscheme")} />
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
