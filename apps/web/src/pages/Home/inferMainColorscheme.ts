import {ColorschemesGridQuery$data} from "./__generated__/ColorschemesGridQuery.graphql";

type ColorschemeNode =
  ColorschemesGridQuery$data["colorschemes"]["edges"][number]["node"];

export default function inferMainColorscheme(colorscheme: ColorschemeNode) {
  const {variants} = colorscheme;

  const matchName = (a: string, b: string) =>
    new RegExp(a + "(.nvim)?", "i").test(b);
  const matchDark = (bg: string) => bg === "DARK";
  const matchLight = (bg: string) => bg === "LIGHT";

  const mainVariantDark = variants.find(
    (v) => matchName(v.name, colorscheme.name) && matchDark(v.background),
  );
  const mainVariant = variants.find((v) => matchName(v.name, colorscheme.name));
  const [firstVariant] = variants;

  return mainVariantDark || mainVariant || firstVariant;
}
