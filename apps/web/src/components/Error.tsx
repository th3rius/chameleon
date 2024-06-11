import {PropsWithChildren} from "react";
import StopIcon from "@/assets/stop.svg";

export default function Error({children}: PropsWithChildren) {
  return (
    <div className="error">
      <span>
        <StopIcon />
      </span>
      <span>{children}</span>

      <style jsx>{`
        .error {
          padding: 8px 12px;
          border-radius: 4px;
          background: hsla(0, 100%, 96%, 1);
          color: hsla(358, 66%, 48%, 1);
          display: flex;
          align-items: center;
          justify-content: space-around;
          gap: 12px;
          flex-grow: 1;
        }

        .error::selection {
          color: white;
          background: hsla(358, 70%, 52%, 1);
        }

        .stop {
          width: 16px;
        }
      `}</style>
    </div>
  );
}
