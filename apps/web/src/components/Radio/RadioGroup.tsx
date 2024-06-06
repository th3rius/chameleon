import {PropsWithChildren} from "react";
import RadioContext from "./RadioContext";

export interface RadioGroupProps extends PropsWithChildren {
  value?: string;
  onChange?: (value: string) => void;
}

export default function RadioGroup({
  children,
  value,
  onChange,
}: RadioGroupProps) {
  function isChecked(valueToCheck: string) {
    return valueToCheck === value;
  }

  return (
    <RadioContext.Provider value={{value, onChange, isChecked}}>
      <div className="group">
        {children}

        <style jsx>{`
          .group {
            height: 40px;
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.08);
            padding: 4px;
            display: flex;
            background: white;
          }
        `}</style>
      </div>
    </RadioContext.Provider>
  );
}
