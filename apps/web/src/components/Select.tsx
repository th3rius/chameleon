import {ChangeEventHandler, PropsWithChildren} from "react";
import ChevronDown from "@/assets/chevronDown.svg";

export interface SelectProps extends PropsWithChildren {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export default function Select({children, value, onChange}: SelectProps) {
  return (
    <div className="container">
      <select className="select" value={value} onChange={onChange}>
        {children}
      </select>
      <span className="chevron">
        <ChevronDown height={18} />
      </span>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          position: relative;
        }

        .select {
          appearance: none;
          outline: none;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          height: 40px;
          padding: 0 36px 0 12px;
          background: #fff;
          transition: box-shadow 0.2s;
          cursor: pointer;
          font-family: "Iosevka Aile", sans-serif;
          font-size: 14px;
        }

        .chevron {
          position: absolute;
          right: 12px;
          display: inline-flex;
          color: #666;
          pointer-events: none;
          transition: color 0.15s;
        }

        .container:focus-within > .select {
          box-shadow:
            0 0 0 1px rgba(0, 0, 0, 0.34),
            0px 0px 0px 4px rgba(0, 0, 0, 0.16);
        }

        @media (hover: hover) {
          .container:hover > select {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.21);
          }

          .container:hover > .chevron {
            color: black;
          }
        }
      `}</style>
    </div>
  );
}
