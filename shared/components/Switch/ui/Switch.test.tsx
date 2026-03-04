import { render } from "@testing-library/react-native";
import { Switch } from "./Switch";

// @shared 경로가 사용되므로 jest-expo나 jest config에서 매핑이 되어있을 수 있지만
// 보통의 경우 useTheme을 여기서 모킹해야 합니다.
jest.mock("@shared", () => ({
  useTheme: () => ({
    colors: { lightGray: "gray", primary: "blue", white: "white" },
  }),
}));

describe("Switch 컴포넌트", () => {
  it("RNSwitch 컴포넌트를 올바르게 렌더링해야 한다", () => {
    const { getByRole, root } = render(<Switch value={true} onValueChange={jest.fn()} />);

    // react-native의 Switch는 기본적으로 accessibilityRole="switch"를 가집니다.
    const switchComp = root.findByType(require("react-native").Switch);
    expect(switchComp).toBeTruthy();
    expect(switchComp.props.value).toBe(true);
  });
});
