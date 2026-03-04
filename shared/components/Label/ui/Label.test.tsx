import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { Label } from "./Label";

describe("Label 컴포넌트", () => {
  it("주어진 텍스트를 올바르게 렌더링해야 한다", () => {
    const { getByText } = render(
      <Label text="이메일">
        <Text>자식 요소</Text>
      </Label>,
    );

    expect(getByText("이메일")).toBeTruthy();
    expect(getByText("자식 요소")).toBeTruthy();
    expect(() => getByText("*")).toThrow();
  });

  it("required 속성이 true일 때 필수 표시(*)를 렌더링해야 한다", () => {
    const { getByText } = render(
      <Label text="비밀번호" required>
        <Text>자식 요소</Text>
      </Label>,
    );

    expect(getByText("비밀번호")).toBeTruthy();
    expect(getByText("*")).toBeTruthy();
  });
});
