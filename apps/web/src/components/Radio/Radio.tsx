import {PropsWithChildren, ReactNode, useContext} from "react";
import clsx from "clsx";
import RadioContext from "./RadioContext";

export interface RadioProps extends PropsWithChildren {
  value: string;
  prefix?: ReactNode;
}

export default function Radio({children, value, prefix}: RadioProps) {
  const {isChecked, onChange} = useContext(RadioContext)!;
  const checked = isChecked(value);

  function handleClick() {
    onChange?.(value);
  }

  return (
    <div className="container" onClick={handleClick}>
      <div className={clsx("radio", {checked})}>
        {prefix && <div className="prefix">{prefix}</div>}
        <div className="content">{children}</div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-self: stretch;
        }

        .radio {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 6px;
          font-size: 14px;
          color: #666;
          transition: color 0.15s;
          cursor: pointer;
        }

        .prefix {
          margin-right: 2px;
          margin-left: 6px;
        }

        .content {
          padding: 0 6px;
        }

        .container:hover > .radio {
          color: black;
        }

        .checked {
          background: hsla(0, 0%, 95%, 1);
          color: black;
          border: 2px;
        }
      `}</style>
    </div>
  );
}
