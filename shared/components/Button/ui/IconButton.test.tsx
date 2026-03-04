import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { IconButton } from "./IconButton";

describe("IconButton 컴포넌트", () => {
  it("자식 요소(아이콘 등)를 정상적으로 렌더링해야 한다", () => {
    const { getByText } = render(
      <IconButton>
        <Text>아이콘</Text>
      </IconButton>,
    );

    expect(getByText("아이콘")).toBeTruthy();
  });

  it("클릭 시 onPress 콜백이 호출되어야 한다", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <IconButton onPress={onPressMock}>
        <Text>아이콘</Text>
      </IconButton>,
    );

    fireEvent.press(getByText("아이콘"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
