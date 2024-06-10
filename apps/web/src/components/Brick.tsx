import {graphql} from "relay-runtime";
import {useFragment} from "react-relay";
import {BrickFragment$key} from "./__generated__/BrickFragment.graphql";

export const BrickFragment = graphql`
  fragment BrickFragment on Variant {
    colorGroups {
      name
      hexCode
    }
  }
`;

export interface BrickProps {
  variant: BrickFragment$key;
}

export default function Brick({variant}: BrickProps) {
  const {colorGroups} = useFragment(BrickFragment, variant);

  const {hexCode: bg} = colorGroups.find(({name}) => name === "NormalBg")!;
  const {hexCode: fg} = colorGroups.find(({name}) => name === "NormalFg")!;

  return (
    <div className="tip">
      <style jsx>{`
        .tip {
          width: 12px;
          height: 6px;
          border-radius: 25%;
          background: ${bg};
          border: 1px solid ${fg};
        }
      `}</style>
    </div>
  );
}
