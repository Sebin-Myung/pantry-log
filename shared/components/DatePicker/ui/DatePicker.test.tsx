import { fireEvent, render } from "@testing-library/react-native";
import { DatePicker } from "./DatePicker";

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockIcon(props: React.ComponentProps<typeof View>) {
    return <View testID="mock-icon" {...props} />;
  };
});

jest.mock("../../../lib/utils/notifications", () => ({}));

jest.mock("../../../lib/storage", () => ({
  storage: {
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    contains: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  },
}));

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { gray: "gray", darkGray: "darkGray", accentDark: "accentDark", primary: "primary" },
  }),
}));

// DateTimePicker 모킹
jest.mock("@react-native-community/datetimepicker", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockDateTimePicker() {
    return <View testID="datetime-picker" />;
  };
});

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

describe("DatePicker 컴포넌트", () => {
  it("기본 placeholder를 렌더링하고, 클릭 시 모달이 열려야 한다", () => {
    const { getByText, queryByTestId } = render(<DatePicker setDate={jest.fn()} placeholder="날짜를 고르세요" />);

    expect(getByText("날짜를 고르세요")).toBeTruthy();
    expect(queryByTestId("overlay-modal")).toBeNull();

    // 트리거 클릭
    fireEvent.press(getByText("날짜를 고르세요"));
    expect(queryByTestId("overlay-modal")).toBeTruthy();
    expect(queryByTestId("datetime-picker")).toBeTruthy();
  });

  it("resetable이 true일 때 초기화 버튼을 렌더링해야 한다", () => {
    const { getAllByRole } = render(<DatePicker setDate={jest.fn()} resetable />);
    // 초기화 버튼(IconButton)이 화면에 존재해야 함, IconButton 내부적으로 Pressable을 렌더링함
    // 여기서는 버튼 컴포넌트의 유무만 확인
    expect(getAllByRole("button").length).toBeGreaterThan(1); // DatePicker 트리거 + 초기화 버튼
  });
});
