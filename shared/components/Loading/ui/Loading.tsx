import { ActivityIndicator, View } from "react-native";
import { useTheme } from "../../../providers/AppThemeProvider";

export function Loading() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
