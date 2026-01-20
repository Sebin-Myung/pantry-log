import { debounce } from "@shared/lib";
import { useEffect, useRef, useState } from "react";

export interface IUseTextInput {
  value: string;
  setValue: (text: string) => void;
}

export function useTextInput({ value, setValue }: IUseTextInput) {
  const [text, setText] = useState<string>(value);

  const debouncedSetValue = useRef(
    debounce((text: string) => {
      setValue(text);
    })
  ).current;

  const onChangeText = (text: string) => {
    setText(text);
    debouncedSetValue(text);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return { value: text, onChangeText };
}
