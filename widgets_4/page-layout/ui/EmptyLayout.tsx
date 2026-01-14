import { useTheme } from "@shared";
import { Text, View } from "react-native";

export function EmptyLayout({ lines }: { lines: string[] }) {
  const theme = useTheme();

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center", alignItems: "center", gap: 4 }}>
      {lines.map((line, idx) => (
        <Text key={idx} style={{ fontSize: 16, color: theme.colors.textSecondary }}>
          {line}
        </Text>
      ))}
    </View>
  );
}
