import { getYearMonthDate } from "@shared";
import { CookingRecordError, CookingRecordErrorCode } from "./error";
import { cookingRecordStorage } from "./storage";
import { CookingRecord } from "./types";
import { getCookingRecordKeys, sortCookingRecords } from "./utils";

const getDatesByMonth = (d: Date): number[] => {
  const { year, month } = getYearMonthDate(d);
  return cookingRecordStorage.getDatesByMonth(year, month);
};

const getAllCookingRecordsByDate = (d: Date): CookingRecord[] => {
  const { year, month, date } = getYearMonthDate(d);
  return cookingRecordStorage.getAllCookingRecordsByDate(year, month, date);
};

const addCookingRecord = (item: CookingRecord) => {
  const savedRecord = cookingRecordStorage.getCookingRecord(item.id);

  if (!!savedRecord) throw new CookingRecordError(CookingRecordErrorCode.DUPLICATED_ID);

  const cookedDate = new Date(item.cookedAt);
  const { year, month, date } = getYearMonthDate(cookedDate);

  const recordsByDate = getAllCookingRecordsByDate(cookedDate);
  const newRecords = sortCookingRecords([...recordsByDate, item]);
  const recordKeys = getCookingRecordKeys(newRecords);

  if (newRecords.length === 1) {
    const datesByMonth = getDatesByMonth(cookedDate);
    cookingRecordStorage.setDatesByMonth(year, month, [...datesByMonth, date]);
  }

  cookingRecordStorage.setIds(year, month, date, recordKeys);
  cookingRecordStorage.addCookingRecord(item);
};

const updateCookingRecord = (id: string, partial: Partial<CookingRecord>) => {
  const currentRecord = cookingRecordStorage.getCookingRecord(id);

  if (!currentRecord) throw new CookingRecordError(CookingRecordErrorCode.NOT_FOUND);

  const newRecord = { ...currentRecord, ...partial };

  if (currentRecord.cookedAt !== newRecord.cookedAt) {
    const currentCookedDate = new Date(currentRecord.cookedAt);
    const { year: cYear, month: cMonth, date: cDate } = getYearMonthDate(currentCookedDate);

    const newCookedDate = new Date(newRecord.cookedAt);
    const { year: nYear, month: nMonth, date: nDate } = getYearMonthDate(newCookedDate);

    const currentRecordsByDate = getAllCookingRecordsByDate(currentCookedDate).filter((record) => record.id === id);
    const newRecordsByDate = sortCookingRecords([...getAllCookingRecordsByDate(newCookedDate), newRecord]);

    // ids 동기화
    cookingRecordStorage.setIds(cYear, cMonth, cDate, getCookingRecordKeys(currentRecordsByDate));
    cookingRecordStorage.setIds(nYear, nMonth, nDate, getCookingRecordKeys(newRecordsByDate));

    // datesByMonth 동기화
    let currentDatesByMonth = getDatesByMonth(currentCookedDate);
    if (currentRecordsByDate.length === 0) {
      currentDatesByMonth = currentDatesByMonth.filter((d) => d !== cDate);
    }
    if (newRecordsByDate.length === 1) {
      if (cYear === nYear && cMonth === nMonth) {
        currentDatesByMonth.push(nDate);
      } else {
        const newDatesByMonth = getDatesByMonth(newCookedDate);
        cookingRecordStorage.setDatesByMonth(nYear, nMonth, [...newDatesByMonth, nDate]);
      }
    }
    cookingRecordStorage.setDatesByMonth(cYear, cMonth, currentDatesByMonth);
  }

  // cookingRecord update
  cookingRecordStorage.updateCookingRecord(id, newRecord);
};

const removeCookingRecord = (id: string) => {
  const record = cookingRecordStorage.getCookingRecord(id);
  if (!record) return;

  const cookedDate = new Date(record.cookedAt);
  const { year, month, date } = getYearMonthDate(cookedDate);

  const recordsByDate = getAllCookingRecordsByDate(cookedDate);
  const filteredRecords = recordsByDate.filter((r) => r.id !== id);

  cookingRecordStorage.setIds(year, month, date, getCookingRecordKeys(filteredRecords));

  if (filteredRecords.length === 0) {
    const datesByMonth = getDatesByMonth(cookedDate);
    const filteredDates = datesByMonth.filter((d) => d !== date);

    cookingRecordStorage.setDatesByMonth(year, month, filteredDates);
  }

  cookingRecordStorage.removeCookingRecord(id);
};

export const cookingRecordRepository = {
  getDatesByMonth,
  getAllCookingRecordsByDate,
  addCookingRecord,
  updateCookingRecord,
  removeCookingRecord,
};
