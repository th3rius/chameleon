import {PropsWithChildren} from "react";

export default function KeyboardInput({children}: PropsWithChildren) {
  return (
    <kbd className="container">
      {children}

      <style jsx>{`
        .container {
          height: 24px;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 0.875rem;
          background: #fff;
          color: black;
          font-weight: 500;
          margin-left: 16px;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </kbd>
  );
}
