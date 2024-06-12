import {PreviewFragment$data} from "./components/Preview/__generated__/PreviewFragment.graphql";

/**
 * Attempts to deduce and return the main variant of a colorscheme according to
 * popular naming conventions and according to the current background filter.
 * Returns the first if unable to infer.
 */
export default function inferMainVariant(colorscheme: PreviewFragment$data) {
  const {variants} = colorscheme;

  const matchName = (a: string, b: string) =>
    new RegExp(a + "(.nvim)?", "i").test(b);
  const matchDark = (bg: string) => bg === "DARK";
  // const matchLight = (bg: string) => bg === "LIGHT";

  const mainVariantDark = variants.find(
    (v) => matchName(v.name, colorscheme.name) && matchDark(v.background),
  );
  const mainVariant = variants.find((v) => matchName(v.name, colorscheme.name));
  const [firstVariant] = variants;

  return mainVariantDark || mainVariant || firstVariant;
}
