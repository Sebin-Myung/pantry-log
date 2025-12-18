import { AppThemeProvider } from "./AppThemeProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
