import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { IconButton, ROUTES } from "@shared";
import { Link, Stack, useNavigation, usePathname } from "expo-router";

export default function MainStackLayout() {
  const pathname = usePathname();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const createHeaderRight = () => {
    if (["/", "/fridge", "/frozen", "/pantry", "/records/recipe"].includes(pathname)) {
      let href: any = ROUTES.addIngredient;

      if (pathname === "/records/recipe") href = ROUTES.addRecipe;
      else if (pathname !== "/") href = `${ROUTES.addIngredient}?location=${pathname.slice(1)}`;

      return (
        <Link href={href} asChild>
          <IconButton>
            <MaterialCommunityIcons name="plus" size={24} color="black" />
          </IconButton>
        </Link>
      );
    }
    return null;
  };
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "PantryLog",
        headerTitleAlign: "center",
        headerBackVisible: false,
        headerLeft: () => (
          <IconButton onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons name="menu" size={24} color="black" />
          </IconButton>
        ),
        headerRight: createHeaderRight,
      }}>
      <Stack.Screen name="(main-tabs)" options={{ headerShown: true }} />
      <Stack.Screen name="ingredient" />
      <Stack.Screen name="recipe" />
      <Stack.Screen name="cooking-record" />
    </Stack>
  );
}
