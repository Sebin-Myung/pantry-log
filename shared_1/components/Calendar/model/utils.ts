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
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};
