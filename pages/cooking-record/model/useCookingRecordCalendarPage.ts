import { getYearMonthDate } from "@shared";
import { useState } from "react";

export function useCookingRecordCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { year, month, date } = getYearMonthDate(selectedDate);

  return { selectedDate, setSelectedDate, year, month, date };
}
