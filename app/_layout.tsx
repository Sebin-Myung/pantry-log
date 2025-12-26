import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, useRouteNavigation } from "@shared";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Providers } from "./_providers";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { goToRoute } = useRouteNavigation();

  const [loaded, error] = useFonts({
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendard-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });

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
          headerRight: () => (
            <Button onPress={() => goToRoute("addIngredient")}>
              <MaterialCommunityIcons name="plus" size={24} color="black" />
            </Button>
          ),
        }}>
        <Stack.Screen name="(tabs)" options={{ title: "PantryLog" }} />
      </Stack>
    </Providers>
  );
}
