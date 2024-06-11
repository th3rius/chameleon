export interface StatusLineProps {
  colors: Record<string, string>;
  bufferName: string;
  percentage: number;
  numberOfLines: number;
  activeLine: number;
}

export default function StatusLine({
  colors,
  bufferName,
  percentage,
  activeLine,
  numberOfLines,
}: StatusLineProps) {
  return (
    <div className="statusline">
      <div className="mode">
        <span>NORMAL</span>
      </div>
      <span className="buffer-name">{bufferName}</span>
      <span>utf-8</span>
      <span>{percentage}%</span>
      <span>
        {activeLine}:{numberOfLines}
      </span>

      <style jsx>{`
        .statusline {
          display: flex;
          align-items: center;
          background: ${colors.StatusLineBg || colors.NormalBg};
          gap: 0.5rem;
          padding-right: 0.5rem;
          overflow-x: auto;
          white-space: nowrap;
        }

        .statusline > span {
          marginleft: 0.5rem;
          color: ${colors.StatusLineFg || colors.NormalBg};
        }

        .mode {
          background: ${colors.StatusLineFg || colors.NormalFg};
          color: ${colors.StatusLineBg || colors.NormalBg};
          padding: 0 0.5rem;
        }

        .buffer-name {
          color: ${colors.StatusLineFg || colors.NormalBg};
          flex: 1 1;
        }
      `}</style>
    </div>
  );
}
