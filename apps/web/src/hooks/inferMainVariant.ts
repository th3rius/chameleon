import {useFragment} from "react-relay";
import {PreviewFragment$key} from "../components/Preview/__generated__/PreviewFragment.graphql";
import {PreviewFragment} from "@/components/Preview/Preview";

/**
 * Attempts to deduce and return the main variant of a colorscheme according to
 * popular naming conventions and according to the current background filter.
 * Returns the first if unable to infer.
 */
export default function useInferMainVariant(
  colorscheme: PreviewFragment$key,
  background: string = "dark",
) {
  const data = useFragment(PreviewFragment, colorscheme);
  const {variants, owner} = data;

  const matchName = (a: string, b: string) =>
    new RegExp(a + "(.nvim)?", "i").test(b);
  const matchBg = (variantBg: string) => variantBg === background.toUpperCase();

  // Check if the main variant has the name of the repository.
  const mainVariantBg = variants.find(
    (v) => matchName(v.name, data.name) && matchBg(v.background),
  );
  const mainVariant = variants.find((v) => matchName(v.name, data.name));

  // Check if the main colorscheme is equal to the owner of the repository.
  // Some repos, such as nord and rose-pine, maintain their theme for many
  // applications under the same organization, e.g. naming them nord/vim.
  const mainVariantOwnerBg = variants.find(
    (v) => v.name === owner && matchBg(v.background),
  );
  const mainVariantOwner = variants.find((v) => v.name === owner);

  // Fallback to the first variant
  const [firstVariant] = variants;

  return (
    mainVariantBg ||
    mainVariant ||
    mainVariantOwnerBg ||
    mainVariantOwner ||
    firstVariant
  );
}
