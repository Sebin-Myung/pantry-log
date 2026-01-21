import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Tabs } from "expo-router";

export default function MainTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 14 },
      }}>
      <Tabs.Screen
        name="(storage-location-tabs)"
        options={{
          title: "재료",
          tabBarIcon: ({ color }) => <FontAwesome5 name="carrot" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cooking-record"
        options={{
          title: "요리 기록",
          tabBarIcon: ({ color }) => <FontAwesome5 name="pencil-alt" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
