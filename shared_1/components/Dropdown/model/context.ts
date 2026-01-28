import { createContext, useContext } from "react";
import { DropdownContextProps } from "./types";

export const DropdownContext = createContext<DropdownContextProps<unknown>>({ onItemClick: (value) => {} });

export const useDropdownContext = <T>() => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Item must be used within Dropdown");
  }
  return context as DropdownContextProps<T>;
};
