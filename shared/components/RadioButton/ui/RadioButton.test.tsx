import { fireEvent, render } from "@testing-library/react-native";
import { RadioButton } from "./RadioButton";

jest.mock("../../..//providers", () => ({
  useTheme: () => ({
    colors: { primary: "blue", gray: "gray" },
  }),
}));

describe("RadioButton 컴포넌트", () => {
  it("라디오 버튼 그룹이 정상적으로 렌더링되어야 한다", () => {
    const { getByText } = render(
      <RadioButton.Group value="A" onValueChange={jest.fn()}>
        <RadioButton.Item label="옵션 A" value="A" />
        <RadioButton.Item label="옵션 B" value="B" />
      </RadioButton.Group>,
    );

    expect(getByText("옵션 A")).toBeTruthy();
    expect(getByText("옵션 B")).toBeTruthy();
  });

  it("아이템 클릭 시 onValueChange가 호출되어야 한다", () => {
    const onValueChangeMock = jest.fn();
    const { getByText } = render(
      <RadioButton.Group value="A" onValueChange={onValueChangeMock}>
        <RadioButton.Item label="옵션 A" value="A" />
        <RadioButton.Item label="옵션 B" value="B" />
      </RadioButton.Group>,
    );

    fireEvent.press(getByText("옵션 B"));
    expect(onValueChangeMock).toHaveBeenCalledWith("B");
  });
});
