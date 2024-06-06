import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Shortcut from "./KeyboardInput";

export interface SearchBarType {
  focus: () => void;
}

export interface SearchBarProps {
  name?: string;
  value?: string;
}

export default forwardRef<SearchBarType, SearchBarProps>(function SearchBar(
  {name, value: initialValue},
  ref,
) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  function handleClick() {
    inputRef.current?.focus();
  }

  function handleChange(ev: FormEvent<HTMLInputElement>) {
    setValue(ev.currentTarget.value);
  }

  return (
    <div className="container" onClick={handleClick}>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        className="search-bar"
        placeholder="Search colorschemes"
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
