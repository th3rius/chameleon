import {graphql} from "relay-runtime";
import CodeSnippet from "./CodeSnippet";
import Gutter from "./Gutter";
import {useFragment} from "react-relay";
import {PreviewFragment$key} from "./__generated__/PreviewFragment.graphql";
import StatusLine from "./StatusLine";

export const PreviewFragment = graphql`
  fragment PreviewFragment on Variant {
    colorGroups {
      name
      hexCode
    }
  }
`;

export interface PreviewProps {
  colorscheme: PreviewFragment$key;
  bufferName: string;
}

export default function Preview({colorscheme, bufferName}: PreviewProps) {
  const data = useFragment(PreviewFragment, colorscheme);

  const colors = data.colorGroups.reduce(
    (acc, cur) => ({...acc, [cur.name]: cur.hexCode}),
    {} as Record<string, string>,
  );

  return (
    <div className="preview">
      <div className="code">
        <Gutter numberOfLines={12} activeLine={6} colors={colors} />
        <CodeSnippet colors={colors} />
      </div>
      <StatusLine
        bufferName={bufferName}
        colors={colors}
        percentage={50}
        activeLine={6}
        numberOfLines={12}
      />

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
    </div>
  );
}
