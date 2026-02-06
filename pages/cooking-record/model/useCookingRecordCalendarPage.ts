import { cookingRecordRepository } from "@entities";
import { getDateFormat, getYearMonthDate } from "@shared";
import { useMemo, useState } from "react";

export function useCookingRecordCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { year, month, date } = getYearMonthDate(selectedDate);

  const recordedDates = useMemo(() => {
    const prevDates = cookingRecordRepository.getDatesByMonth(new Date(year, month - 1));
    const currentDates = cookingRecordRepository.getDatesByMonth(new Date(year, month));
    const nextDates = cookingRecordRepository.getDatesByMonth(new Date(year, month + 1));

    const dates: string[] = [];

    prevDates.forEach((d) => dates.push(getDateFormat(new Date(year, month - 1, d))));
    currentDates.forEach((d) => dates.push(getDateFormat(new Date(year, month, d))));
    nextDates.forEach((d) => dates.push(getDateFormat(new Date(year, month + 1, d))));

    return dates;
  }, [year, month]);

  return { selectedDate, setSelectedDate, year, month, date, recordedDates };
}
