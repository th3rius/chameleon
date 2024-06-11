import {MouseEvent, PropsWithChildren, ReactNode} from "react";
import clsx from "clsx";

export interface ButtonProps extends PropsWithChildren {
  suffix?: ReactNode;
  secondary?: boolean;
  disabled?: boolean;
  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  secondary,
  disabled,
  suffix,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx("button", {secondary})}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
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
          border: none;
        }

        .secondary {
          background: white;
          color: black;
          box-shadow: 0 0 0 1px rgb(0 0 0 / 8%);
        }

        .button[disabled] {
          cursor: not-allowed;
          background: hsla(0, 0%, 95%, 1);
          color: hsla(0, 0%, 56%, 1);
          box-shadow: 0 0 0 1px hsla(0, 0%, 92%, 1);
        }

        .content {
          padding: 0 6px;
        }

        .suffix {
          margin-left: 2px;
        }

        @media (hover: hover) {
          .button:hover:not([disabled]) {
            background: #383838;
          }

          .button.secondary:hover:not([disabled]) {
            background: rgb(0 0 0 / 8%);
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
          }
        }
      `}</style>
    </button>
  );
}
