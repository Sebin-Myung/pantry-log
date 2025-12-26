import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

export default function CategoryLayout() {
  return (
    <MaterialTopTabs>
      <MaterialTopTabs.Screen name="index" options={{ title: "전체" }} />
      <MaterialTopTabs.Screen name="frozen" options={{ title: "냉동" }} />
      <MaterialTopTabs.Screen name="fridge" options={{ title: "냉장" }} />
      <MaterialTopTabs.Screen name="pantry" options={{ title: "상온" }} />
    </MaterialTopTabs>
  );
}
