import { compareDateAsc } from "@shared";
import { CookingRecord } from "./types";
import { getCookingRecordKeys, sortCookingRecords } from "./utils";

jest.mock("@shared", () => ({
  compareDateAsc: jest.fn(),
}));

describe("cooking-record/model/utils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("sortCookingRecords", () => {
    const item1 = { id: "record-1", updatedAt: "2024-01-02T00:00:00.000Z" } as CookingRecord;
    const item2 = { id: "record-2", updatedAt: "2024-01-01T00:00:00.000Z" } as CookingRecord;

    it("updatedAt이 빠른 순으로 정렬한다", () => {
      (compareDateAsc as jest.Mock).mockImplementation((a, b) => {
        if (a === "late" && b === "early") return 1;
        if (a === "early" && b === "late") return -1;
        return 0;
      });
      const early = { ...item1, id: "earlyRecord", updatedAt: "early" };
      const late = { ...item2, id: "lateRecord", updatedAt: "late" };

      const result = sortCookingRecords([late, early]);
      expect(result[0].id).toBe("earlyRecord");
      expect(compareDateAsc).toHaveBeenCalled();
    });
  });

  describe("getCookingRecordKeys", () => {
    it("배열에서 id만 추출한다", () => {
      const items = [{ id: "1" }, { id: "2" }] as CookingRecord[];
      expect(getCookingRecordKeys(items)).toEqual(["1", "2"]);
    });
  });
});
