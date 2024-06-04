import {loadQuery, RelayEnvironmentProvider} from "react-relay";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import relayEnvironment from "./relayEnvironment";
import HomeGetColorschemesQuery from "./pages/__generated__/HomeGetColorschemesQuery.graphql";
import globalStyles from "./globalStyles";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Home />}
      loader={() => loadQuery(relayEnvironment, HomeGetColorschemesQuery, {})}
    >
      <Route path="/test" element={<div />} />,
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

    <style jsx global>
      {globalStyles}
    </style>
  </>,
);
