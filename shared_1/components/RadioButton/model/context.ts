import { createContext, useContext } from "react";
import { RadioButtonGroupProps } from "./type";

export const RadioButtonContext = createContext<RadioButtonGroupProps<unknown>>({ onValueChange: (value) => {} });

export const useRadioButtonContext = <T>() => {
  const context = useContext(RadioButtonContext);

  if (!context) {
    throw new Error("RadioButton.Item must be used within RadioButton.Group");
  }
  return context as RadioButtonGroupProps<T>;
};
