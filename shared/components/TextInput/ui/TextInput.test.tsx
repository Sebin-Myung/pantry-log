import { fireEvent, render } from "@testing-library/react-native";
import { TextInput } from "./TextInput";

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { gray: "gray" },
  }),
}));

describe("TextInput 컴포넌트", () => {
  it("기본 텍스트를 렌더링해야 한다", () => {
    const { getByDisplayValue } = render(<TextInput value="기본 텍스트" setValue={jest.fn()} />);

    expect(getByDisplayValue("기본 텍스트")).toBeTruthy();
  });

  it("텍스트 입력 시 setValue가 호출되어야 한다", () => {
    const setValueMock = jest.fn();
    const { getByDisplayValue } = render(<TextInput value="" setValue={setValueMock} placeholder="입력하세요" />);

    // TextInput 컴포넌트를 직접 찾아 텍스트 변경 이벤트 발생
    const input = getByDisplayValue("");
    fireEvent.changeText(input, "새로운 텍스트");

    expect(setValueMock).toHaveBeenCalledWith("새로운 텍스트");
  });
});
