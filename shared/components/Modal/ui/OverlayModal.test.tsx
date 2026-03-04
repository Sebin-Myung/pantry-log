import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { OverlayModal } from "./OverlayModal";

describe("OverlayModal 컴포넌트", () => {
  it("visible 속성이 true일 때 모달을 렌더링해야 한다", () => {
    const { getByText } = render(
      <OverlayModal visible={true} onRequestClose={jest.fn()}>
        <Text>모달 내용</Text>
      </OverlayModal>,
    );

    expect(getByText("모달 내용")).toBeTruthy();
  });

  it("모달 외부를 클릭했을 때 onRequestClose 콜백이 호출되어야 한다", () => {
    const onRequestCloseMock = jest.fn();
    const { getByTestId } = render(
      <OverlayModal visible={true} onRequestClose={onRequestCloseMock}>
        <Text>모달 내용</Text>
      </OverlayModal>,
    );

    const pressableBackground = getByTestId("overlay-backdrop");
    fireEvent.press(pressableBackground);

    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
});
