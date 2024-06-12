import Background from "./Background";
import ColorschemeOrder from "./ColorschemeOrder";
import EditorFilter from "./EditorFilter";

export default interface ColorschemesQueryArgs {
  query?: string;
  background?: Background;
  first: number;
  after?: string;
  orderBy?: ColorschemeOrder;
  editor?: EditorFilter;
}
