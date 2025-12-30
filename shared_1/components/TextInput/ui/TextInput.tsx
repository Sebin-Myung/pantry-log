import { useTheme } from "@shared";
import { TextInput as BaseTextInput } from "react-native";

export type BaseTextInputProps = React.ComponentProps<typeof BaseTextInput>;

export function TextInput({ style, ...props }: BaseTextInputProps) {
  const theme = useTheme();

  return (
    <BaseTextInput
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
