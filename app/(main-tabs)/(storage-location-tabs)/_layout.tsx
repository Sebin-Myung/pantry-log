import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, ROUTES, TopTabLayout } from "@shared";
import { Link, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from "react";

export default function StorageLocationTabsLayout() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        headerRight: () => (
          <Link href={ROUTES.addIngredient} asChild>
            <IconButton>
              <MaterialCommunityIcons name="plus" size={24} color="black" />
            </IconButton>
          </Link>
        ),
      });

      return () => {
        navigation.getParent()?.setOptions({ headerRight: undefined });
      };
    }, [])
  );

  return (
    <TopTabLayout screenOptions={{ title: "PantryLog" }}>
      <TopTabLayout.Screen name="index" options={{ title: "전체" }} />
      <TopTabLayout.Screen name="frozen" options={{ title: "냉동" }} />
      <TopTabLayout.Screen name="fridge" options={{ title: "냉장" }} />
      <TopTabLayout.Screen name="pantry" options={{ title: "실온" }} />
    </TopTabLayout>
  );
}
