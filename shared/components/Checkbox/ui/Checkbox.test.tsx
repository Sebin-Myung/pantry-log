import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Checkbox } from "./Checkbox";

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { primary: "blue" },
  }),
}));

// FontAwesome5를 모킹하여 렌더링 및 클릭 이벤트를 확인할 수 있도록 처리합니다.
jest.mock("@expo/vector-icons/FontAwesome5", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function MockFontAwesome5({ name }: { name: string }) {
    return <Text testID="icon-mock">{name}</Text>;
  };
});

describe("Checkbox 컴포넌트", () => {
  it("value가 false일 때 체크되지 않은 아이콘을 렌더링해야 한다", () => {
    const onValueChangeMock = jest.fn();
    const { getByTestId } = render(
      <Checkbox value={false} onValueChange={onValueChangeMock}>
        <Text>동의합니다</Text>
      </Checkbox>,
    );

    expect(getByTestId("icon-mock").props.children).toBe("square");
  });

  it("value가 true일 때 체크된 아이콘을 렌더링해야 한다", () => {
    const onValueChangeMock = jest.fn();
    const { getByTestId, getByText } = render(
      <Checkbox value={true} onValueChange={onValueChangeMock}>
        <Text>동의합니다</Text>
      </Checkbox>,
    );

    expect(getByTestId("icon-mock").props.children).toBe("check-square");
    expect(getByText("동의합니다")).toBeTruthy();
  });

  it("아이콘 버튼을 클릭 시 onValueChange가 반대 값으로 호출되어야 한다", () => {
    const onValueChangeMock = jest.fn();
    const { getByTestId } = render(
      <Checkbox value={false} onValueChange={onValueChangeMock}>
        <Text>동의합니다</Text>
      </Checkbox>,
    );

    // IconButton(Pressable)은 Checkbox 내부에 감싸져 있으므로 아이콘을 클릭합니다
    const icon = getByTestId("icon-mock");
    fireEvent.press(icon);

    expect(onValueChangeMock).toHaveBeenCalledWith(true);
  });
});
