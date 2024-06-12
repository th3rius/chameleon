import clsx from "clsx";

export interface GutterProps {
  numberOfLines: number;
  activeLine: number;
  colors: Record<string, string>;
}

export default function Gutter({
  numberOfLines,
  activeLine,
  colors,
}: GutterProps) {
  const lines = Array.from({length: numberOfLines}).map((_line, i) => i + 1);

  return (
    <div className="gutter">
      {lines.map((line) => (
        <div
          className={clsx("line", line === activeLine && "active")}
          key={line}
        >
          {line}
        </div>
      ))}

      <style jsx>{`
        .gutter {
          background: ${colors.LineNrBg || colors.NormalBg};
          color: ${colors.StatusLineFg || colors.NormalFg};
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.5rem 0;
        }

        .line {
          padding: 0 0.5rem;
          text-align: right;
        }

        .active {
          background: ${colors.CursorLineBg ||
          colors.LineNrBg ||
          colors.NormalBg};
          color: ${colors.CursorLineNrFg || colors.LineNrFg};
        }
      `}</style>
    </div>
  );
}
