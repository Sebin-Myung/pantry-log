import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { useTheme } from "../../../providers";
import { IconButton } from "../../Button";

export interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Checkbox({ value, onValueChange, children }: PropsWithChildren<CheckboxProps>) {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <IconButton style={{ marginRight: 8 }} onPress={() => onValueChange(!value)}>
        {!value ? (
          <FontAwesome5 name="square" size={24} color={theme.colors.primary} />
        ) : (
          <FontAwesome5 name="check-square" size={24} color={theme.colors.primary} />
        )}
      </IconButton>
      {children}
    </View>
  );
}
