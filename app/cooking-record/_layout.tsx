import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function CookingRecordLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="add"
        options={{ headerShown: true, title: "요리 기록 추가", headerLeft: () => <BackButton /> }}
      />
    </Stack>
  );
}
