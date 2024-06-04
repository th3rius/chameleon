import {forwardRef, useImperativeHandle, useRef} from "react";
import Shortcut from "./KeyboardInput";

export type SearchBarType = {
  focus: () => void;
};

export default forwardRef<SearchBarType>(function SearchBar(_props, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="container" onClick={handleClick}>
      <input
        className="search-bar"
        placeholder="Search colorschemes..."
        ref={inputRef}
      />
      <Shortcut>/</Shortcut>

      <style jsx>{`
        .container {
          border-radius: 4px;
          background: #f2f2f2;
          height: 40px;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 0 12px;
          cursor: text;
        }

        .search-bar {
          all: unset;
        }

        .search-bar::placeholder {
          color: #8f8f8f;
          transition: color 0.15s;
        }

        @media (hover: hover) {
          .container:hover,
          .container:focus-within {
            background: #ebebeb;
          }

          .container:hover > .search-bar {
            color: black;
          }

          .container:hover,
          .container:focus-within > .search-bar::placeholder {
            color: #7d7d7d;
          }
        }
      `}</style>
    </div>
  );
});
