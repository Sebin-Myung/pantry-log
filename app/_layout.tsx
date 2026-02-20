import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconButton, ROUTES } from "@shared";
import { useFonts } from "expo-font";
import { Link, SplashScreen, Stack, usePathname } from "expo-router";
import { useEffect } from "react";
import { useIngredientStore } from "../entities";
import { Providers } from "./_providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });
  const hydrate = useIngredientStore((state) => state.hydrate);

  const pathname = usePathname();

  const createHeaderRight = () => {
    if (["/", "/fridge", "/frozen", "/pantry", "/records/recipe"].includes(pathname)) {
      return (
        <Link href={pathname === "/records/recipe" ? ROUTES.addRecipe : ROUTES.addIngredient} asChild>
          <IconButton>
            <MaterialCommunityIcons name="plus" size={24} color="black" />
          </IconButton>
        </Link>
      );
    }
    return null;
  };

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitle: "PantryLog",
          headerTitleAlign: "center",
          headerBackVisible: false,
          headerRight: createHeaderRight,
        }}>
        <Stack.Screen name="(main-tabs)" options={{ headerShown: true }} />
        <Stack.Screen name="ingredient" />
        <Stack.Screen name="recipe" />
        <Stack.Screen name="cooking-record" />
      </Stack>
    </Providers>
  );
}
