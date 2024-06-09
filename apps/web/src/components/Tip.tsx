import {graphql} from "relay-runtime";
import {useFragment} from "react-relay";
import {TipFragment$key} from "./__generated__/TipFragment.graphql";

export const TipFragment = graphql`
  fragment TipFragment on Variant {
    colorGroups {
      name
      hexCode
    }
  }
`;

export interface TipProps {
  variant: TipFragment$key;
}

export default function Tip({variant}: TipProps) {
  const {colorGroups} = useFragment(TipFragment, variant);

  const {hexCode: bg} = colorGroups.find(({name}) => name === "NormalBg")!;
  const {hexCode: fg} = colorGroups.find(({name}) => name === "NormalFg")!;

  return (
    <div className="tip">
      <style jsx>{`
        .tip {
          width: 12px;
          height: 6px;
          border-radius: 4px;
          background: ${bg};
          border: 1px solid ${fg};
        }
      `}</style>
    </div>
  );
}
