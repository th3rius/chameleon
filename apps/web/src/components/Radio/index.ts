import Radio from "./Radio";
import RadioGroup, {RadioGroupProps} from "./RadioGroup";

type RadioWithGroupType = typeof Radio & {
  Group: typeof RadioGroup;
};

const RadioWithGroup = Radio as RadioWithGroupType;
RadioWithGroup.Group = RadioGroup;

export type {RadioGroupProps};
export {RadioGroup as Group};

export default RadioWithGroup;
