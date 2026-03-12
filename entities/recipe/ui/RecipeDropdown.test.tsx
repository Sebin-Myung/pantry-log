import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useRecipeDropdown } from "../model/selection";
import { RecipeDropdown } from "./RecipeDropdown";

jest.mock("../model/selection", () => ({
  useRecipeDropdown: jest.fn(),
}));

jest.mock("@shared", () => {
  const React = require("react");
  const { View, Text, Pressable } = require("react-native");

  const DropdownRoot = ({ placeholder, value, label, onValueChange, children, disabled }: any) => (
    <View testID="dropdown-root" accessibilityState={{ disabled }}>
      <Text testID="dropdown-placeholder">{placeholder}</Text>
      <Text testID="dropdown-label">{label}</Text>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          onPress: () => onValueChange(child.props.value),
        }),
      )}
    </View>
  );

  const DropdownItem = ({ label, value, onPress, isLast }: any) => (
    <Pressable
      testID={`dropdown-item-${value.id}`}
      onPress={onPress}
      accessibilityState={{ selected: isLast }} // isLast 값을 확인하기 위해 selected 속성으로 매핑
    >
      <Text>{label}</Text>
    </Pressable>
  );

  return {
    Dropdown: {
      Root: DropdownRoot,
      Item: DropdownItem,
    },
  };
});

describe("RecipeDropdown", () => {
  const mockOptions = {
    isLoading: false,
    recipeLabelValues: [
      { label: "김치찌개", value: { id: "recipe-1", name: "김치찌개" } },
      { label: "된장찌개", value: { id: "recipe-2", name: "된장찌개" } },
    ],
    selectedRecipe: { label: "김치찌개", value: { id: "recipe-1", name: "김치찌개" } },
    onRecipeChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링되어야 한다", () => {
    (useRecipeDropdown as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId, getByText } = render(
      <RecipeDropdown selectedRecipe={undefined} setSelectedRecipe={jest.fn()} />,
    );

    expect(getByTestId("dropdown-placeholder").props.children).toBe("레시피를 선택하세요.");
    expect(getByTestId("dropdown-label").props.children).toBe("김치찌개");

    const firstItem = getByTestId("dropdown-item-recipe-1");
    const lastItem = getByTestId("dropdown-item-recipe-2");

    // isLast 검증
    expect(firstItem.props.accessibilityState.selected).toBe(false);
    expect(lastItem.props.accessibilityState.selected).toBe(true);

    // disabled 루트 확인
    expect(getByTestId("dropdown-root").props.accessibilityState.disabled).toBe(false);
  });

  it("레시피가 없을 때 루트에 disabled 속성과 알림 문구가 전달되어야 한다", () => {
    (useRecipeDropdown as jest.Mock).mockReturnValue({
      ...mockOptions,
      recipeLabelValues: [],
      selectedRecipe: null,
    });

    const { getByTestId } = render(<RecipeDropdown selectedRecipe={undefined} setSelectedRecipe={jest.fn()} />);

    expect(getByTestId("dropdown-placeholder").props.children).toBe("등록한 레시피가 없습니다.");
    expect(getByTestId("dropdown-root").props.accessibilityState.disabled).toBe(true);
  });

  it("아이템 선택 시 onRecipeChange가 호출되어야 한다", () => {
    (useRecipeDropdown as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<RecipeDropdown selectedRecipe={undefined} setSelectedRecipe={jest.fn()} />);

    fireEvent.press(getByTestId("dropdown-item-recipe-2"));

    expect(mockOptions.onRecipeChange).toHaveBeenCalledWith({ id: "recipe-2", name: "된장찌개" });
  });
});
