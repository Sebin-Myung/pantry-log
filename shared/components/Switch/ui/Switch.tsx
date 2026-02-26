import { useTheme } from "@shared";
import { Switch as RNSwitch, SwitchProps, View } from "react-native";

export function Switch({ trackColor, thumbColor, ...props }: SwitchProps) {
  const theme = useTheme();

  return (
    <View>
      <RNSwitch
        trackColor={{ false: theme.colors.lightGray, true: theme.colors.primary, ...trackColor }}
        thumbColor={thumbColor ?? theme.colors.white}
        {...props}
      />
    </View>
  );
}
