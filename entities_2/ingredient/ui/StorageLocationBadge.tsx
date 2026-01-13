import { useTheme } from "@shared";
import { Text, View } from "react-native";
import { StorageLocation, StorageLocationKorean } from "../model";

interface Props {
  location: StorageLocation;
}

export function StorageLocationBadge({ location }: Props) {
  const theme = useTheme();

  return (
    <View
      style={{
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: theme.colors[`${location}Light`],
        flexShrink: 0,
      }}>
      <Text style={{ color: theme.colors[location], fontSize: 12 }}>{StorageLocationKorean[location]}</Text>
    </View>
  );
}
