import { PropsWithChildren } from "react";
import { ColorValue, Text, View } from "react-native";

interface BadgeProps {
  backgroundColor: ColorValue;
  color: ColorValue;
}

export function Badge({ backgroundColor, color, children }: PropsWithChildren<BadgeProps>) {
  return (
    <View
      style={{
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor,
        flexShrink: 0,
      }}>
      <Text style={{ color, fontSize: 12 }}>{children}</Text>
    </View>
  );
}
