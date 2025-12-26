import { AppThemeProvider } from "@shared";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
