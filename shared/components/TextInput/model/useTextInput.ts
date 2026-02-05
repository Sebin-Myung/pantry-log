export interface IUseTextInput {
  value: string;
  setValue: (text: string) => void;
}

export function useTextInput({ value, setValue }: IUseTextInput) {
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return { value, onChangeText };
}
