import {PropsWithChildren} from "react";

export interface WindowProps extends PropsWithChildren {
  title: string;
  editor: string;
}

export default function Window({children, title, editor}: WindowProps) {
  return (
    <div className="window">
      <div className="header">
        <div className="traffic-lights">
          <span className="traffic-light-button close" />
          <span className="traffic-light-button minimize" />
          <span className="traffic-light-button fullscreen" />
        </div>
        <span className="title">{title}</span>
        <span className="editor">{editor}</span>
      </div>
      {children}

      <style jsx>{`
        .window {
          border: 1px solid rgba(0, 0, 0, 0.04);
          border-radius: 4px;
          flex-grow: 1;
          overflow: hidden;
        }

        .header {
          height: 36px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          background: white;
          font-size: 12px;
          color: #666;
          justify-content: space-between;
        }

        .title {
          display: flex;
          height: 36px;
          align-items: center;
          justify-content: center;
        }

        .editor {
          margin-right: 12px;
        }

        .traffic-lights {
          margin-left: 12px;
          display: flex;
          align-items: center;
        }

        .traffic-light-button {
          border-radius: 50%;
          width: 12px;
          height: 12px;
          display: inline-block;
        }

        .close {
          background: #ff5f56;
        }

        .minimize {
          background: #ffbd2e;
          margin-left: 8px;
        }

        .fullscreen {
          background: #27c93f;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
