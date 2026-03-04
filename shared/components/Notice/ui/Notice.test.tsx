import { render } from "@testing-library/react-native";
import { Notice } from "./Notice";

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { accentLight: "light", textSecondary: "gray" },
  }),
}));

describe("Notice 컴포넌트", () => {
  it("여러 줄의 텍스트가 정상적으로 렌더링되어야 한다", () => {
    const lines = ["첫 번째 안내 사항", "두 번째 안내 사항"];
    const { getByText } = render(<Notice lines={lines} />);

    expect(getByText("첫 번째 안내 사항")).toBeTruthy();
    expect(getByText("두 번째 안내 사항")).toBeTruthy();
  });
});
