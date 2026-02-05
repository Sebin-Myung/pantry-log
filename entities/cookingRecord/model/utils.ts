import { compareDateAsc } from "@shared";
import { CookingRecord } from "./types";

export const sortCookingRecords = (items: CookingRecord[]) => {
  return [...items].sort((a, b) => {
    // 수정일자 빠른 순
    return compareDateAsc(a.updatedAt, b.updatedAt);
  });
};

export const getCookingRecordKeys = (items: CookingRecord[]) => {
  return items.map((item) => item.id);
};
