import { fireEvent, render } from "@testing-library/react-native";
import { getDateFormat } from "../../../lib/utils";
import { padZero } from "../../../lib/utils/number";
import { Calendar } from "./Calendar";

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockIcon(props: React.ComponentProps<typeof View>) {
    return <View testID="mock-icon" {...props} />;
  };
});

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { accent: "accent", text: "text", accentDark: "accentDark", white: "white" },
  }),
}));

import React, { useState } from "react";

const mockToday = new Date();
const currentYear = mockToday.getFullYear();
const currentMonth = mockToday.getMonth();
const expectedMonthString = `${currentYear}.${padZero(currentMonth + 1)}`;

const CalendarWrapper = ({ initialDate }: { initialDate: Date }) => {
  const [date, setDate] = useState(initialDate);
  return <Calendar selectedDate={date} setSelectedDate={setDate} />;
};

describe("Calendar 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("현재 연도와 월을 올바르게 표시해야 한다", () => {
    const { getByText } = render(<Calendar selectedDate={mockToday} setSelectedDate={jest.fn()} />);

    expect(getByText(expectedMonthString)).toBeTruthy();
  });

  it("날짜 셀을 렌더링하고, 클릭 시 setSelectedDate가 호출되어야 한다", () => {
    const mockSetSelectedDate = jest.fn();
    const { getByText } = render(<Calendar selectedDate={mockToday} setSelectedDate={mockSetSelectedDate} />);

    // 15일은 항상 현재 월의 셀 중 하나로 고유하게 존재함 (이전/다음 달의 15일은 달력 뷰에 나타나지 않음)
    const midMonthCell = getByText("15");
    expect(midMonthCell).toBeTruthy();

    fireEvent.press(midMonthCell);
    expect(mockSetSelectedDate).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedDate.mock.calls[0][0].getDate()).toBe(15);
  });

  it("이전 달, 다음 달 이동 버튼 클릭 시 현재 달 표시가 변경되어야 한다", () => {
    const { getAllByRole, getByText, queryByText } = render(<CalendarWrapper initialDate={mockToday} />);

    const buttons = getAllByRole("button");
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(getByText(expectedMonthString)).toBeTruthy();

    // 이전 달 클릭
    fireEvent.press(prevButton);
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const prevMonthString = `${prevMonthDate.getFullYear()}.${padZero(prevMonthDate.getMonth() + 1)}`;
    expect(getByText(prevMonthString)).toBeTruthy();
    expect(queryByText(expectedMonthString)).toBeNull();

    // 다음 달 클릭 (원래 달로 복귀)
    fireEvent.press(nextButton);
    expect(getByText(expectedMonthString)).toBeTruthy();
    expect(queryByText(prevMonthString)).toBeNull();

    // 한 번 더 다음 달 클릭
    fireEvent.press(nextButton);
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    const nextMonthString = `${nextMonthDate.getFullYear()}.${padZero(nextMonthDate.getMonth() + 1)}`;
    expect(getByText(nextMonthString)).toBeTruthy();
    expect(queryByText(expectedMonthString)).toBeNull();
  });

  it("상태(일요일, 토요일, 오늘, 선택됨, 하이라이트 등)에 따라 올바른 스타일이 적용되어야 한다", () => {
    // 임의의 고정된 날짜 (2026년 4월 15일)로 렌더링 (4월 1일은 수요일이므로 이전 달인 3월 31일이 렌더링됨. 4/5 일요일, 4/4 토요일 존재)
    const testDate = new Date("2026-04-15T00:00:00Z");
    const highlightDate = "2026-04-10";

    const { getByTestId, unmount } = render(
      <Calendar selectedDate={testDate} setSelectedDate={jest.fn()} highlightDays={[highlightDate]} />,
    );

    // 1. 선택된 날짜 (2026-04-15)
    expect(getByTestId("cell-box-2026-04-15").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderWidth: 1, borderColor: "accent" })]),
    );

    // 2. 하이라이트된 날짜 (2026-04-10)
    expect(getByTestId("cell-circle-2026-04-10").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ borderWidth: 3, borderColor: "accentDark" })]),
    );

    // 3. 일요일 (2026-04-05)
    expect(getByTestId("cell-text-2026-04-05").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "red" })]),
    );

    // 4. 토요일 (2026-04-04)
    expect(getByTestId("cell-text-2026-04-04").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "blue" })]),
    );

    // 5. 이전 달 표기용 날짜 (2026-03-31)
    expect(getByTestId("cell-text-2026-03-31").props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ opacity: 0.3 })]),
    );
    unmount();

    // 6. 오늘 날짜 테스트 (mockToday를 이용해 현재 달력 렌더링)
    const { getByTestId: getByTestIdToday } = render(<Calendar selectedDate={mockToday} setSelectedDate={jest.fn()} />);
    const todayFormatted = getDateFormat(mockToday);

    // 오늘 텍스트는 white, bold 이어야 함
    expect(getByTestIdToday(`cell-text-${todayFormatted}`).props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "white", fontWeight: "bold" })]),
    );
    // 오늘 원 배경색은 text(테마의 text 컬러) 이어야 함
    expect(getByTestIdToday(`cell-circle-${todayFormatted}`).props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: "text" })]),
    );
  });
});
