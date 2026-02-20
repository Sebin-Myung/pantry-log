import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function IngredientLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
      <Stack.Screen name="add" options={{ title: "재료 추가", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="edit/[id]" options={{ title: "재료 수정", headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
