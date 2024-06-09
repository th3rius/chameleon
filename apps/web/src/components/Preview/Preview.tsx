import {graphql} from "relay-runtime";
import CodeSnippet from "./CodeSnippet";
import Gutter from "./Gutter";
import {useFragment} from "react-relay";
import {PreviewFragment$key} from "./__generated__/PreviewFragment.graphql";
import StatusLine from "./StatusLine";
import Window from "./Window";
import Colors from "./Colors";
import inferMainVariant from "@/inferMainVariant";

export const PreviewFragment = graphql`
  fragment PreviewFragment on Colorscheme {
    name
    variants {
      name
      background
      colorGroups {
        name
        hexCode
      }
    }
  }
`;

export interface PreviewProps {
  colorscheme: PreviewFragment$key;
  bufferName: string;
}

export default function Preview({colorscheme, bufferName}: PreviewProps) {
  const data = useFragment(PreviewFragment, colorscheme);
  const variant = inferMainVariant(data);
  const numberOfLines = 12;
  const activeLine = 6;
  const percentage = Math.round((activeLine * 100) / numberOfLines);

  const colors = variant.colorGroups.reduce<Colors>(
    (acc, cur) => ({...acc, [cur.name]: cur.hexCode}),
    {},
  );

  return (
    <Window title={bufferName}>
      <div className="preview">
        <div className="code">
          <Gutter
            numberOfLines={numberOfLines}
            activeLine={activeLine}
            colors={colors}
          />
          <CodeSnippet colors={colors} />
        </div>
        <StatusLine
          bufferName={bufferName}
          colors={colors}
          percentage={percentage}
          activeLine={activeLine}
          numberOfLines={numberOfLines}
        />
      </div>

      <style jsx>{`
        .preview {
          font-family: "Iosevka", monospace;
          font-size: 16px;
          line-height: 1.5;
        }

        .code {
          display: flex;
        }
      `}</style>
    </Window>
  );
}
