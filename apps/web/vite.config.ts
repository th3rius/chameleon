import relay from "vite-plugin-relay";
import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    relay,
    react({
      babel: {plugins: ["styled-jsx/babel"]},
    }),
  ],
});
