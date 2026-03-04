import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "./Button";

// useTheme 훅 모킹
jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: {
      primary: "blue",
      secondary: "green",
      tertiary: "gray",
    },
  }),
}));

describe("Button 컴포넌트", () => {
  it("기본 속성(primary 변형)으로 올바르게 렌더링되어야 한다", () => {
    const { getByText } = render(
      <Button>
        <Button.Text>테스트 버튼</Button.Text>
      </Button>,
    );

    expect(getByText("테스트 버튼")).toBeTruthy();
  });

  it("isSubmitting 속성이 true일 때 ActivityIndicator를 렌더링해야 한다", () => {
    const { queryByText } = render(
      <Button isSubmitting>
        <Button.Text>테스트 버튼</Button.Text>
      </Button>,
    );

    expect(queryByText("테스트 버튼")).toBeNull();
  });

  it("버튼 클릭 시 onPress 콜백이 호출되어야 한다", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock}>
        <Button.Text>클릭</Button.Text>
      </Button>,
    );

    fireEvent.press(getByText("클릭"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("disabled 속성이 true일 때 버튼이 비활성화되고 클릭 이벤트가 동작하지 않아야 한다", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button onPress={onPressMock} disabled>
        <Button.Text>비활성 버튼</Button.Text>
      </Button>,
    );

    fireEvent.press(getByText("비활성 버튼"));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
