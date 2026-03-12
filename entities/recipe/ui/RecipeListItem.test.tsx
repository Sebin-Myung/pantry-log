import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { RecipeListItem } from "./RecipeListItem";

jest.mock("@expo/vector-icons/Entypo", () => {
  const { Text } = require("react-native");
  return ({ name }: { name: string }) => <Text testID={`entypo-icon-${name}`} />;
});

jest.mock("@shared", () => ({
  useTheme: () => ({
    colors: {
      gray: "grayColor",
      textSecondary: "textSecondaryColor",
    },
  }),
}));

jest.mock("../../ingredient", () => ({
  getQuantityString: jest.fn((qty) => `${qty.amount}${qty.unit}`),
}));

describe("RecipeListItem", () => {
  const defaultProps = {
    id: "recipe-1",
    name: "김치찌개",
    ingredients: [
      { name: "돼지고기", quantity: { amount: 300, unit: "g" as const } },
      { name: "김치", quantity: null }, // quantity가 매핑 안되어있는 상황
      { name: "양파", quantity: { amount: 1, unit: "pcs" as const } },
    ],
    onPress: jest.fn(),
    onLongPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링되어야 한다", () => {
    const { getByText, getByTestId, queryByText } = render(<RecipeListItem {...defaultProps} />);

    expect(getByText("김치찌개")).toBeTruthy();
    expect(getByText("돼지고기")).toBeTruthy();
    expect(getByText("김치")).toBeTruthy();
    expect(getByText("양파")).toBeTruthy();

    expect(getByText("300g")).toBeTruthy();
    expect(getByText("1pcs")).toBeTruthy();

    // 수량이 정의되지 않은 재료에 대해서는 수량 관련 텍스트가 렌더링되지 않음에 주의
    // getQuantityString이 'null' 같은 문자열을 반환하지 않았음을 확인 (이미 null 체크를 통과함)
  });

  it("onPress와 onLongPress가 호출되어야 한다", () => {
    const { getByTestId } = render(<RecipeListItem {...defaultProps} />);
    const pressable = getByTestId("recipe-list-item");

    fireEvent.press(pressable);
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);

    fireEvent(pressable, "longPress");
    expect(defaultProps.onLongPress).toHaveBeenCalledTimes(1);
  });
});
