import { createContext, useContext } from "react";
import { ButtonVariant } from "./types";

interface ButtonContextProps {
  variant: ButtonVariant;
}

export const ButtonContext = createContext<ButtonContextProps>({ variant: "primary" });

export const useButtonContext = () => {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error("Button must be used within ButtonProvider");
  }

  return context;
};
