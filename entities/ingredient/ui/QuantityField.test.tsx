import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { useQuantityField } from "../model/quantity";
import { QuantityField } from "./QuantityField";

jest.mock("../model/quantity", () => ({
  useQuantityField: jest.fn(),
}));

jest.mock("@shared", () => {
  const React = require("react");
  const { View, Text, TextInput: RNTextInput, Pressable } = require("react-native");

  const RadioButtonGroup = ({ value, onValueChange, children }: any) => (
    <View testID="radio-group" accessibilityValue={{ text: String(value) }}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          onPress: () => onValueChange(child.props.value),
        }),
      )}
    </View>
  );

  const RadioButtonItem = ({ label, value, onPress }: any) => (
    <Pressable testID={`radio-item-${value}`} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );

  const RadioButton = {
    Group: RadioButtonGroup,
    Item: RadioButtonItem,
  };

  const TextInput = ({ value, setValue, placeholder }: any) => (
    <RNTextInput testID="text-input" value={value} onChangeText={setValue} placeholder={placeholder} />
  );

  const DropdownRoot = ({ value, label, onValueChange, children, disabled }: any) => (
    <View testID="dropdown-root" accessibilityState={{ disabled }}>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, {
          onPress: () => onValueChange(child.props.value),
        }),
      )}
    </View>
  );

  const DropdownItem = ({ label, value, onPress }: any) => (
    <Pressable testID={`dropdown-item-${value}`} onPress={onPress}>
      <Text>{label}</Text>
    </Pressable>
  );

  const Dropdown = {
    Root: DropdownRoot,
    Item: DropdownItem,
  };

  return { RadioButton, TextInput, Dropdown };
});

describe("QuantityField", () => {
  const mockOptions = {
    isQuantityEnabled: true,
    value: { amount: "10", unit: { label: "g", value: "g" } },
    units: [
      { label: "g", value: "g" },
      { label: "ml", value: "ml" },
    ],
    onQuantityOptionChange: jest.fn(),
    onQuantityAmountChange: jest.fn(),
    onQuantityUnitChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("isQuantityEnabled가 false일 때 라디오 버튼만 렌더링해야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue({
      ...mockOptions,
      isQuantityEnabled: false,
    });

    const { getByTestId, queryByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} />);

    expect(getByTestId("radio-group")).toBeTruthy();
    expect(queryByTestId("text-input")).toBeNull();
    expect(queryByTestId("dropdown-root")).toBeNull();
  });

  it("isQuantityEnabled가 true일 때 텍스트 입력과 드롭다운이 렌더링되어야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} />);

    expect(getByTestId("radio-group")).toBeTruthy();
    expect(getByTestId("text-input")).toBeTruthy();
    expect(getByTestId("dropdown-root")).toBeTruthy();
    expect(getByTestId("dropdown-item-g")).toBeTruthy();
    expect(getByTestId("dropdown-item-ml")).toBeTruthy();
  });

  it("라디오 버튼 변경 시 onQuantityOptionChange가 호출되어야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} />);

    fireEvent.press(getByTestId("radio-item-false"));
    expect(mockOptions.onQuantityOptionChange).toHaveBeenCalledWith(false);
  });

  it("텍스트 입력 변경 시 onQuantityAmountChange가 호출되어야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} />);

    fireEvent.changeText(getByTestId("text-input"), "20");
    expect(mockOptions.onQuantityAmountChange).toHaveBeenCalledWith("20");
  });

  it("드롭다운 아이템 선택 시 onQuantityUnitChange가 호출되어야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} />);

    fireEvent.press(getByTestId("dropdown-item-ml"));
    expect(mockOptions.onQuantityUnitChange).toHaveBeenCalledWith("ml");
  });

  it("unitDisabled 속성이 Dropdown.Root로 전달되어야 한다", () => {
    (useQuantityField as jest.Mock).mockReturnValue(mockOptions);

    const { getByTestId } = render(<QuantityField value={undefined} setValue={jest.fn()} unitDisabled />);

    expect(getByTestId("dropdown-root").props.accessibilityState.disabled).toBe(true);
  });
});
