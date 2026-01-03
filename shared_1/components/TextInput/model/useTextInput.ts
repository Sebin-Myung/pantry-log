import { useEffect } from "react";

export interface IUseTextInput {
  initialValue?: string;
  value: string;
  setValue: (text: string) => void;
}

export function useTextInput({ initialValue, value, setValue }: IUseTextInput) {
  const onChangeText = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    if (initialValue !== undefined && initialValue !== value) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return { value, onChangeText };
}
