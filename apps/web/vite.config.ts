import relay from "vite-plugin-relay";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    relay,
    tsconfigPaths(),
    react({
      babel: {
        plugins: [
          [
            "styled-jsx/babel",
            {
              plugins: ["styled-jsx-plugin-postcss"],
            },
          ],
        ],
      },
    }),
    svgr({
      include: "**/*.svg",
      svgrOptions: {
        plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      },
    }),
  ],
});
