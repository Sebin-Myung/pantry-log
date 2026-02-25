import { useIngredientStore } from "@entities";
import { useTheme } from "@shared";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
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

  const theme = useTheme();

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
      <Drawer
        screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: theme.colors.background, width: 200 } }}>
        <Drawer.Screen name="(main-stack)" options={{ drawerLabel: "홈" }} />
        <Drawer.Screen name="settings" options={{ drawerLabel: "설정" }} />
      </Drawer>
    </Providers>
  );
}
