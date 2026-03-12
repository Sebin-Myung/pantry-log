import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useStorageLocationRadioButton } from "../model/storage-location";
import { StorageLocationRadioButton } from "./StorageLocationRadioButton";

jest.mock("../model/storage-location", () => ({
  useStorageLocationRadioButton: jest.fn(),
}));

jest.mock("@shared", () => {
  const React = require("react");
  const { View, Text, Pressable } = require("react-native");

  const RadioButtonGroup = ({ value, onValueChange, children }: any) => (
    <View testID="radio-group" accessibilityValue={{ text: String(value) }}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          onPress: () => onValueChange(child.props.value),
        }),
      )}
    </View>
  );

  const RadioButtonItem = ({ label, value, onPress, isFirst, isLast }: any) => (
    <Pressable
      testID={`radio-item-${value}`}
      onPress={onPress}
      accessibilityState={{ checked: isFirst, selected: isLast }} // for testing pass-through
    >
      <Text>{label}</Text>
    </Pressable>
  );

  return {
    RadioButton: {
      Group: RadioButtonGroup,
      Item: RadioButtonItem,
    },
  };
});

describe("StorageLocationRadioButton", () => {
  const mockOptions = {
    items: [
      { label: "냉장", value: "fridge" },
      { label: "냉동", value: "frozen" },
      { label: "실온", value: "pantry" },
    ],
    selectedLocation: { label: "냉장", value: "fridge" },
    onValueChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useStorageLocationRadioButton as jest.Mock).mockReturnValue(mockOptions);
  });

  it("정상적으로 렌더링되어야 한다", () => {
    const { getByTestId, getByText } = render(
      <StorageLocationRadioButton selectedLocation={undefined} setSelectedLocation={jest.fn()} />,
    );

    expect(getByTestId("radio-group")).toBeTruthy();
    expect(getByText("냉장")).toBeTruthy();
    expect(getByText("냉동")).toBeTruthy();
    expect(getByText("실온")).toBeTruthy();

    const firstItem = getByTestId("radio-item-fridge");
    const middleItem = getByTestId("radio-item-frozen");
    const lastItem = getByTestId("radio-item-pantry");

    // isFirst, isLast가 정확하게 전달되었는지 mock에서 accessibilityState로 검증
    expect(firstItem.props.accessibilityState.checked).toBe(true);
    expect(firstItem.props.accessibilityState.selected).toBe(false);

    expect(middleItem.props.accessibilityState.checked).toBe(false);
    expect(middleItem.props.accessibilityState.selected).toBe(false);

    expect(lastItem.props.accessibilityState.checked).toBe(false);
    expect(lastItem.props.accessibilityState.selected).toBe(true);
  });

  it("아이템 클릭 시 onValueChange가 호출되어야 한다", () => {
    const { getByTestId } = render(
      <StorageLocationRadioButton selectedLocation={undefined} setSelectedLocation={jest.fn()} />,
    );

    fireEvent.press(getByTestId("radio-item-frozen"));

    expect(mockOptions.onValueChange).toHaveBeenCalledWith("frozen");
  });
});
