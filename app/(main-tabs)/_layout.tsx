import { Tabs } from "expo-router";

export default function MainTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(storage-location-tabs)" options={{ title: "재료" }} />
      <Tabs.Screen name="cooking-record" options={{ title: "요리 기록" }} />
    </Tabs>
  );
}
