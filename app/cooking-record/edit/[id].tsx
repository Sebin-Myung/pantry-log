import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  const cookingRecordId = Array.isArray(id) ? id[0] : id;

  return <Text>{`id: ${cookingRecordId}`}</Text>;
}
