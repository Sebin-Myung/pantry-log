import { TopTabLayout } from "@shared";

export default function CookingRecordTabsLayout() {
  return (
    <TopTabLayout>
      <TopTabLayout.Screen name="cooking-record" options={{ title: "요리 기록" }} />
      <TopTabLayout.Screen name="recipe" options={{ title: "레시피" }} />
    </TopTabLayout>
  );
}
