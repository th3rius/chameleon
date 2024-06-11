import {FormEvent} from "react";

export interface InputProps {
  value?: string;
  onChange?: (ev: FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  placeholder,
  value,
  onChange,
  required,
}: InputProps) {
  return (
    <>
      <input
        className="input"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />

      <style jsx>{`
        .input {
          border-radius: 4px;
          width: 100%;
          box-shadow: 0 0 0 1px rgb(0 0 0 / 8%);
          transition: box-shadow 0.15s;
          border: none;
          outline: none;
          height: 40px;
          padding: 0 12px;
        }

        .input::placeholder {
          color: hsla(0, 0%, 56%, 1);
        }

        .input:focus {
          box-shadow:
            0 0 0 1px rgb(0 0 0 / 34%),
            0 0 0 4px rgba(0, 0, 0, 0.16);
        }
      `}</style>
    </>
  );
}
