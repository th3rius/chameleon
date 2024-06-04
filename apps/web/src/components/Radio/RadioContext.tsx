import {createContext} from "react";

export interface RadioContextType {
  value?: string;
  onChange?: (value: string) => void;
  isChecked: (valueToCheck: string) => boolean;
}

export default createContext<RadioContextType | null>(null);
