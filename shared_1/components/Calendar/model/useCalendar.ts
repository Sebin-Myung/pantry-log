import { useMemo } from "react";
import { getFirstDayOfMonth, getLastDayOfMonth, getYearMonthDate } from "./utils";

interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

export interface IUseCalendar {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function useCalendar({ selectedDate, setSelectedDate }: IUseCalendar) {
  const today = new Date();
  const { year, month } = getYearMonthDate(selectedDate);

  const onDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const onPrevMonthClick = () => {
    setSelectedDate(getLastDayOfMonth(year, month - 1));
  };

  const onNextMonthClick = () => {
    setSelectedDate(getFirstDayOfMonth(year, month + 1));
  };

  const calendarCells = useMemo(() => {
    const firstDay = getFirstDayOfMonth(year, month);
    const lastDay = getLastDayOfMonth(year, month);

    const cells: CalendarCell[] = [];
    for (let i = firstDay.getDay(); i > 0; i--) {
      cells.push({
        date: new Date(year, month, 1 - i),
        isCurrentMonth: false,
      });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      cells.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    for (let i = 1; i <= 6 - lastDay.getDay(); i++) {
      cells.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return cells;
  }, [year, month]);

  return { today, year, month, calendarCells, onDateClick, onPrevMonthClick, onNextMonthClick };
}
