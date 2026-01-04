import { TextInput as BaseTextInput } from "react-native";
import { useTheme } from "../../../providers/AppThemeProvider";
import { IUseTextInput, useTextInput } from "../model/useTextInput";

export type BaseTextInputProps = React.ComponentProps<typeof BaseTextInput>;

export function TextInput({ initialValue, value, setValue, style, ...props }: BaseTextInputProps & IUseTextInput) {
  const theme = useTheme();
  const { value: valueText, onChangeText } = useTextInput({ initialValue, value, setValue });

  return (
    <BaseTextInput
      value={valueText}
      onChangeText={onChangeText}
      style={[
        {
          alignSelf: "stretch",
          width: "100%",
          minHeight: 50,
          borderColor: theme.colors.gray,
          borderWidth: 1,
          borderRadius: 10,
          padding: 10,
          fontSize: 20,
        },
        style,
      ]}
      {...props}
    />
  );
}
