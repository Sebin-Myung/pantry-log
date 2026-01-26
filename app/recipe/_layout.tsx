import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function RecipeLayout() {
  return (
    <Stack>
      <Stack.Screen name="add" options={{ title: "레시피 추가", headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
