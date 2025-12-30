export interface AppColor {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  accentDark: string;

  background: string;
  text: string;
  textSecondary: string;

  white: string;
  black: string;
  lightGray: string;
  gray: string;
  darkGray: string;
}

export interface AppTheme extends Omit<ReactNavigation.Theme, "colors"> {
  colors: AppColor;
}
