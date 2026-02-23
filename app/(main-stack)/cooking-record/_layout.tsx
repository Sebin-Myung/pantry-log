import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function CookingRecordLayout() {
  return (
    <Stack screenOptions={{ headerShown: true, headerTitleAlign: "center" }}>
      <Stack.Screen name="add" options={{ title: "요리 기록 추가", headerLeft: () => <BackButton /> }} />
      <Stack.Screen name="edit/[id]" options={{ title: "요리 기록 수정", headerLeft: () => <BackButton /> }} />
    </Stack>
  );
}
