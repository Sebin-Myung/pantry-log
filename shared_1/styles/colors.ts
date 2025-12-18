import { AppColor } from "@shared";

export const LightColors: AppColor = {
  primary: "rgb(159, 166, 119)", // #9fa677
  secondary: "rgb(201, 204, 168)", // #c9cca8
  tertiary: "rgb(241, 232, 177)", // #f1e8b1
  accent: "rgb(247, 192, 176)", // #f7c0b0
  accentDark: "rgb(217, 127, 104)", // #d97f68

  background: "rgb(250, 250, 250)", // #fafafa
  text: "rgb(41, 41, 41)", // #292929
  textSecondary: "rgb(71, 71, 71)", // #474747

  white: "rgb(255, 255, 255)", // #ffffff
  black: "rgb(0, 0, 0)", // #000000
};

// 추후 설정 예정
export const DarkColors: AppColor = {
  ...LightColors,
};
