import { Text, View } from "react-native";
import { useTheme } from "../../../providers";

export function Notice({ lines }: { lines: string[] }) {
  const theme = useTheme();

  return (
    <View style={{ borderRadius: 10, backgroundColor: theme.colors.accentLight, padding: 10 }}>
      {lines.map((line, idx) => (
        <Text key={idx} style={{ fontSize: 16, color: theme.colors.textSecondary, fontWeight: "600" }}>
          {line}
        </Text>
      ))}
    </View>
  );
}
