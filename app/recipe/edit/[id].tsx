import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  const recipeId = Array.isArray(id) ? id[0] : id;

  return <Text>{`edit recipe: ${recipeId}`}</Text>;
}
