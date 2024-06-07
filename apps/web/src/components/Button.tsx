import {PropsWithChildren, ReactNode} from "react";

export interface ButtonProps extends PropsWithChildren {
  suffix?: ReactNode;
}

export default function Button({children, suffix}: ButtonProps) {
  return (
    <button className="button">
      <span className="content">{children}</span>
      {suffix && <div className="suffix">{suffix}</div>}

      <style jsx>{`
        .button {
          border-radius: 4px;
          background: black;
          color: white;
          height: 48px;
          padding: 0 14px;
          cursor: pointer;
          transition-duration: 0.15s;
          transition-property: background-color color;
          display: flex;
          align-items: center;
        }

        .content {
          padding: 0 6px;
        }

        .suffix {
          margin-left: 2px;
        }

        @media (hover: hover) {
          .button:hover {
            background: #383838;
          }
        }
      `}</style>
    </button>
  );
}
