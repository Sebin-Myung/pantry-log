import { padZero, storage } from "@shared";
import { CookingRecord } from "./types";

const datesByMonthKey = (year: number, month: number) => `cookingRecords:dates:${year}-${padZero(month)}`;
const idsKey = (year: number, month: number, date: number) =>
  `cookingRecords:ids:${year}-${padZero(month)}-${padZero(date)}`;
const itemKey = (id: string) => `cookingRecord:${id}`;

const getDatesByMonth = (year: number, month: number): number[] => {
  const raw = storage.getString(datesByMonthKey(year, month));
  const arr: string[] = raw ? JSON.parse(raw) : [];
  return arr.map((a) => Number(a));
};

const setDatesByMonth = (year: number, month: number, dates: number[]) => {
  storage.set(datesByMonthKey(year, month), JSON.stringify(dates));
};

const getIds = (year: number, month: number, date: number): string[] => {
  const raw = storage.getString(idsKey(year, month, date));
  return raw ? JSON.parse(raw) : [];
};

const setIds = (year: number, month: number, date: number, ids: string[]) => {
  storage.set(idsKey(year, month, date), JSON.stringify(ids));
};

const addCookingRecord = (item: CookingRecord) => {
  storage.set(itemKey(item.id), JSON.stringify(item));
};

const getCookingRecord = (id: string): CookingRecord | null => {
  const raw = storage.getString(itemKey(id));
  return raw ? JSON.parse(raw) : null;
};

const updateCookingRecord = (id: string, item: CookingRecord) => {
  storage.set(itemKey(id), JSON.stringify(item));
};

const removeCookingRecord = (id: string) => {
  storage.remove(itemKey(id));
};

const getAllCookingRecordsByDate = (year: number, month: number, date: number): CookingRecord[] => {
  const ids = getIds(year, month, date);
  return ids.map((id) => getCookingRecord(id)).filter((item): item is CookingRecord => item !== null);
};

export const cookingRecordStorage = {
  getDatesByMonth,
  setDatesByMonth,
  getIds,
  setIds,
  addCookingRecord,
  getCookingRecord,
  updateCookingRecord,
  removeCookingRecord,
  getAllCookingRecordsByDate,
};
