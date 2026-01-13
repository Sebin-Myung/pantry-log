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

  frozen: string;
  frozenLight: string;
  fridge: string;
  fridgeLight: string;
  pantry: string;
  pantryLight: string;
}

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
  lightGray: "rgb(240, 240, 240)", // #f0f0f0
  gray: "rgb(200, 200, 200)", // #c8c8c8
  darkGray: "rgb(100, 100, 100)", // #646464

  frozen: "rgb(58, 88, 99)", // #3a5863
  frozenLight: "rgb(220, 232, 235)", // #dce8eb
  fridge: "rgb(74, 104, 55)", // #4a6837
  fridgeLight: "rgb(228, 234, 214)", // #e4ead6
  pantry: "rgb(132, 88, 46)", // #84582e
  pantryLight: "rgb(245, 238, 226)", // #f5eee2
};

// 추후 설정 예정
export const DarkColors: AppColor = {
  ...LightColors,
};
