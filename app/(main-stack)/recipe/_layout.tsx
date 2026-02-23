import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function RecipeLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
      <Stack.Screen name="add" options={{ title: "레시피 추가", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="edit/[id]" options={{ title: "레시피 수정", headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
