import { ThemeProvider } from "@react-navigation/native";
import { AppTheme, DarkColors, Fonts, LightColors } from "@shared";
import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const fonts: AppTheme["fonts"] = {
  regular: {
    fontFamily: Fonts.regular,
    fontWeight: "400",
  },
  medium: {
    fontFamily: Fonts.medium,
    fontWeight: "500",
  },
  bold: {
    fontFamily: Fonts.semiBold,
    fontWeight: "600",
  },
  heavy: {
    fontFamily: Fonts.bold,
    fontWeight: "700",
  },
};

const LightTheme: AppTheme = { dark: false, colors: LightColors, fonts };
const DarkTheme: AppTheme = { dark: true, colors: DarkColors, fonts };

const ThemeContext = createContext<AppTheme>(LightTheme);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  const appTheme = colorScheme === "dark" ? DarkTheme : LightTheme;

  const navigationTheme: ReactNavigation.Theme = {
    ...appTheme,
    colors: {
      primary: appTheme.colors.primary,
      background: appTheme.colors.background,
      card: appTheme.colors.tertiary,
      text: appTheme.colors.text,
      border: appTheme.colors.secondary,
      notification: appTheme.colors.accentDark,
    },
  };

  return (
    <ThemeContext.Provider value={appTheme}>
      <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
