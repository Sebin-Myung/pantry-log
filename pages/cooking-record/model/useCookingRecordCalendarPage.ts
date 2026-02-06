import { CookingRecord, cookingRecordRepository } from "@entities";
import { getDateFormat, getYearMonthDate } from "@shared";
import { useEffect, useState } from "react";

export function useCookingRecordCalendarPage() {
  const [recordedDates, setRecordedDates] = useState<string[]>([]);
  const [cookingRecords, setCookingRecords] = useState<CookingRecord[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { year, month, date } = getYearMonthDate(selectedDate);

  const getRecordedDates = (): string[] => {
    const prevDates = cookingRecordRepository.getDatesByMonth(new Date(year, month - 1));
    const currentDates = cookingRecordRepository.getDatesByMonth(new Date(year, month));
    const nextDates = cookingRecordRepository.getDatesByMonth(new Date(year, month + 1));

    const dates: string[] = [];

    prevDates.forEach((d) => dates.push(getDateFormat(new Date(year, month - 1, d))));
    currentDates.forEach((d) => dates.push(getDateFormat(new Date(year, month, d))));
    nextDates.forEach((d) => dates.push(getDateFormat(new Date(year, month + 1, d))));

    return dates;
  };

  const getCookingRecords = (): CookingRecord[] => {
    return cookingRecordRepository.getAllCookingRecordsByDate(selectedDate);
  };

  const refetchDatas = () => {
    setRecordedDates(getRecordedDates());
    setCookingRecords(getCookingRecords());
  };

  useEffect(() => {
    setRecordedDates(getRecordedDates());
  }, [year, month]);

  useEffect(() => {
    setCookingRecords(getCookingRecords());
  }, [selectedDate]);

  return { selectedDate, setSelectedDate, year, month, date, recordedDates, cookingRecords, refetchDatas };
}
