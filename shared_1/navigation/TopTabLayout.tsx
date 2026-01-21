import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { PropsWithChildren } from "react";
import { useTheme } from "../providers/AppThemeProvider";

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext(Navigator);

interface TopTabLayoutProps {}

export function TopTabLayout({ children }: PropsWithChildren<TopTabLayoutProps>) {
  const theme = useTheme();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16 },
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
      }}>
      {children}
    </MaterialTopTabs>
  );
}

TopTabLayout.Screen = MaterialTopTabs.Screen;
