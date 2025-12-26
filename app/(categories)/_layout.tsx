import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useTheme } from "../providers/AppThemeProvider";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

export default function CategoryLayout() {
  const theme = useTheme();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
      }}>
      <MaterialTopTabs.Screen name="index" options={{ title: "전체" }} />
      <MaterialTopTabs.Screen name="frozen" options={{ title: "냉동" }} />
      <MaterialTopTabs.Screen name="fridge" options={{ title: "냉장" }} />
      <MaterialTopTabs.Screen name="pantry" options={{ title: "실온" }} />
    </MaterialTopTabs>
  );
}
