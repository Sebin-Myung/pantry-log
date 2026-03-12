import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useIngredientDropdown } from "../model/selection";
import { IngredientDropdown } from "./IngredientDropdown";

jest.mock("../model/selection", () => ({
  useIngredientDropdown: jest.fn(),
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

  const DropdownItem = ({ label, value, onPress, isLast, disabled }: any) => (
    <Pressable
      testID={`dropdown-item-${value.id}`}
      onPress={onPress}
      accessibilityState={{ selected: isLast, disabled }} // isLast와 disabled를 확인용으로 매핑
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

describe("IngredientDropdown", () => {
  const mockOptions = {
    isLoading: false,
    ingredientLabelValues: [
      { label: "돼지고기 (냉장)", value: { id: "1", name: "돼지고기" } },
      { label: "양파 (실온)", value: { id: "2", name: "양파" } },
    ],
    selectedIngredient: { label: "돼지고기 (냉장)", value: { id: "1", name: "돼지고기" } },
    onIngredientChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링되어야 한다", () => {
    (useIngredientDropdown as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId, getByText } = render(
      <IngredientDropdown selectedIngredient={undefined} setSelectedIngredient={jest.fn()} />,
    );

    expect(getByTestId("dropdown-placeholder").props.children).toBe("재료를 선택하세요.");
    expect(getByTestId("dropdown-label").props.children).toBe("돼지고기 (냉장)");

    const firstItem = getByTestId("dropdown-item-1");
    const lastItem = getByTestId("dropdown-item-2");

    // isLast 값 검증 (접근성 selected에 매핑해놓음)
    expect(firstItem.props.accessibilityState.selected).toBe(false);
    expect(lastItem.props.accessibilityState.selected).toBe(true);

    // disabled 값 검증 (접근성 disabled에 매핑해놓음)
    expect(firstItem.props.accessibilityState.disabled).toBe(false);
    expect(lastItem.props.accessibilityState.disabled).toBe(false);
  });

  it("disabledIngredientIds 배열에 있는 아이템은 disabled로 렌더링되어야 한다", () => {
    (useIngredientDropdown as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(
      <IngredientDropdown
        selectedIngredient={undefined}
        setSelectedIngredient={jest.fn()}
        disabledIngredientIds={["1"]}
      />,
    );

    const disabledItem = getByTestId("dropdown-item-1");
    const enabledItem = getByTestId("dropdown-item-2");

    expect(disabledItem.props.accessibilityState.disabled).toBe(true);
    expect(enabledItem.props.accessibilityState.disabled).toBe(false);
  });

  it("재료가 없을 때 루트에 disabled 속성과 알림 문구가 전달되어야 한다", () => {
    (useIngredientDropdown as jest.Mock).mockReturnValue({
      ...mockOptions,
      ingredientLabelValues: [],
      selectedIngredient: null,
    });

    const { getByTestId } = render(
      <IngredientDropdown selectedIngredient={undefined} setSelectedIngredient={jest.fn()} />,
    );

    expect(getByTestId("dropdown-placeholder").props.children).toBe("등록한 재료가 없습니다.");
    expect(getByTestId("dropdown-root").props.accessibilityState.disabled).toBe(true);
  });

  it("아이템 선택 시 onIngredientChange가 호출되어야 한다", () => {
    (useIngredientDropdown as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(
      <IngredientDropdown selectedIngredient={undefined} setSelectedIngredient={jest.fn()} />,
    );

    fireEvent.press(getByTestId("dropdown-item-2"));

    expect(mockOptions.onIngredientChange).toHaveBeenCalledWith({ id: "2", name: "양파" });
  });
});
