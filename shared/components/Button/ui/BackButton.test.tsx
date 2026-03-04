import { fireEvent, render } from "@testing-library/react-native";
import { BackButton } from "./BackButton";

// useRouterFunc 모킹
const mockGoBack = jest.fn();
jest.mock("../../../lib/hooks", () => ({
  useRouterFunc: () => ({
    goBack: mockGoBack,
  }),
}));

describe("BackButton 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링되어야 한다", () => {
    const { root } = render(<BackButton />);
    // MaterialCommunityIcons가 내부적으로 아이콘을 렌더링하는 것을 검증하거나 컴포넌트가 마운트됨을 검증
    expect(root).toBeTruthy();
  });

  it("클릭 시 goBack 훅이 호출되어야 한다", () => {
    const { root } = render(<BackButton testID="back-button" />);
    // Pressable을 찾아서 클릭
    const button = root.findByProps({ testID: "back-button" });
    fireEvent.press(button);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
