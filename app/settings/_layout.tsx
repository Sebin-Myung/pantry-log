import { BackButton } from "@shared";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "설정",
        headerTitleAlign: "center",
        headerBackVisible: false,
        headerLeft: () => <BackButton />,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
