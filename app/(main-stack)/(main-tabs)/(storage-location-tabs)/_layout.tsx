import { TopTabLayout } from "@shared";

export default function StorageLocationTabsLayout() {
  return (
    <TopTabLayout>
      <TopTabLayout.Screen name="index" options={{ title: "전체" }} />
      <TopTabLayout.Screen name="frozen" options={{ title: "냉동" }} />
      <TopTabLayout.Screen name="fridge" options={{ title: "냉장" }} />
      <TopTabLayout.Screen name="pantry" options={{ title: "실온" }} />
    </TopTabLayout>
  );
}
