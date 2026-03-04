import { fireEvent, render } from "@testing-library/react-native";
import { Dropdown } from "./Dropdown";

// 테마 모킹
jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { gray: "gray", darkGray: "darkGray", lightGray: "lightGray" },
  }),
}));

// OverlayModal에서 내부 Container를 렌더링할 수 있도록 모킹
jest.mock("../../Modal/ui/OverlayModal", () => {
  const React = require("react");
  const { View } = require("react-native");
  const MockOverlayModal = ({ visible, children }: React.PropsWithChildren<{ visible?: boolean }>) => {
    if (!visible) return null;
    return <View testID="overlay-modal">{children}</View>;
  };
  MockOverlayModal.Container = ({ children }: React.PropsWithChildren<{}>) => <View>{children}</View>;
  return { OverlayModal: MockOverlayModal };
});

describe("Dropdown 컴포넌트", () => {
  it("기본 placeholder를 표시하고, 클릭 시 옵션 목록을 보여주어야 한다", () => {
    const { getByText, queryByTestId, queryByText } = render(
      <Dropdown.Root onValueChange={jest.fn()} placeholder="선택하세요">
        <Dropdown.Item label="옵션 1" value="1" />
        <Dropdown.Item label="옵션 2" value="2" isLast />
      </Dropdown.Root>,
    );

    // 기본 placeholder 확인
    expect(getByText("선택하세요")).toBeTruthy();

    // 초기 상태에서는 모달이 렌더링되지 않아야 함
    expect(queryByTestId("overlay-modal")).toBeNull();

    // 드롭다운 트리거 클릭
    fireEvent.press(getByText("선택하세요"));

    // 모달이 열리고 옵션이 렌더링되어야 함
    expect(queryByTestId("overlay-modal")).toBeTruthy();
    expect(getByText("옵션 1")).toBeTruthy();
    expect(getByText("옵션 2")).toBeTruthy();
  });

  it("옵션을 선택하면 onValueChange가 호출되고 모달이 닫혀야 한다", () => {
    const onValueChangeMock = jest.fn();
    const { getByText, queryByTestId } = render(
      <Dropdown.Root onValueChange={onValueChangeMock} placeholder="선택하세요">
        <Dropdown.Item label="옵션 1" value="1" />
      </Dropdown.Root>,
    );

    // 트리거 열기
    fireEvent.press(getByText("선택하세요"));

    // '옵션 1' 클릭
    fireEvent.press(getByText("옵션 1"));

    expect(onValueChangeMock).toHaveBeenCalledWith("1");
    // 선택 후 자동적으로 모달(드롭다운)이 닫혀야 함
    expect(queryByTestId("overlay-modal")).toBeNull();
  });
});
