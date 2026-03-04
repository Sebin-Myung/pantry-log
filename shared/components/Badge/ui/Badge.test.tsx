import { render } from "@testing-library/react-native";
import { Badge } from "../ui/Badge";

describe("Badge 컴포넌트", () => {
  it("주어진 자식 요소와 스타일 속성(배경색, 글자색)을 올바르게 렌더링해야 한다", () => {
    const { getByText } = render(
      <Badge backgroundColor="red" color="white">
        Test Badge
      </Badge>,
    );

    const badgeText = getByText("Test Badge");
    expect(badgeText).toBeTruthy();

    const textStyle = badgeText.props.style;
    if (Array.isArray(textStyle)) {
      expect(textStyle).toEqual(expect.arrayContaining([expect.objectContaining({ color: "white" })]));
    } else {
      expect(textStyle).toEqual(expect.objectContaining({ color: "white" }));
    }

    const viewStyle = badgeText.parent?.parent?.props.style;
    if (Array.isArray(viewStyle)) {
      expect(viewStyle).toEqual(expect.arrayContaining([expect.objectContaining({ backgroundColor: "red" })]));
    } else {
      expect(viewStyle).toEqual(expect.objectContaining({ backgroundColor: "red" }));
    }
  });
});
