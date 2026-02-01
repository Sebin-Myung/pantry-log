import { padZero } from "./number";

export const compareDateAsc = (a?: string | null, b?: string | null): number => {
  if (!a && !b) return 0;
  if (!a) return 1; // a가 없으면 뒤로
  if (!b) return -1; // b가 없으면 뒤로

  return new Date(a).getTime() - new Date(b).getTime();
};

export const getYearMonthDate = (date: Date) => {
  return { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() };
};

export const isSameDate = (a: Date, b: Date) => {
  const aFormat = getYearMonthDate(a);
  const bFormat = getYearMonthDate(b);

  return aFormat.year === bFormat.year && aFormat.month === bFormat.month && aFormat.date === bFormat.date;
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1);
};

export const getLastDayOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0);
};

export const getDateFormat = (date: Date) => {
  const y = date.getFullYear();
  const m = padZero(date.getMonth() + 1);
  const d = padZero(date.getDate());
  return `${y}-${m}-${d}`;
};
