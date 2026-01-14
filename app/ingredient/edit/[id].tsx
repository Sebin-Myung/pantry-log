import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditIngredientPage() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>edit ingredient: {id}</Text>
    </View>
  );
}
