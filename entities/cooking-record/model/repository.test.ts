import { CookingRecordError, CookingRecordErrorCode } from "./error";
import { cookingRecordRepository } from "./repository";
import { cookingRecordStorage } from "./storage";
import { CookingRecord } from "./types";

jest.mock("./storage", () => ({
  cookingRecordStorage: {
    getDatesByMonth: jest.fn(),
    setDatesByMonth: jest.fn(),
    getIds: jest.fn(),
    setIds: jest.fn(),
    addCookingRecord: jest.fn(),
    getCookingRecord: jest.fn(),
    updateCookingRecord: jest.fn(),
    removeCookingRecord: jest.fn(),
    getAllCookingRecordsByDate: jest.fn(),
  },
}));

jest.mock("@shared", () => ({
  getYearMonthDate: (d: Date) => ({
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
  }),
  compareDateAsc: (a: string | Date, b: string | Date) => new Date(a).getTime() - new Date(b).getTime(),
  compareDateDesc: (a: string | Date, b: string | Date) => new Date(b).getTime() - new Date(a).getTime(),
}));

describe("cookingRecordRepository", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockRecord1: CookingRecord = {
    id: "record-1",
    name: "계란말이",
    ingredients: [],
    createdAt: "2024-03-10T12:00:00.000Z",
    updatedAt: "2024-03-10T12:00:00.000Z",
    cookedAt: "2024-03-15",
  };

  const mockRecord2: CookingRecord = {
    id: "record-2",
    name: "김치찌개",
    ingredients: [],
    createdAt: "2024-03-11T12:00:00.000Z",
    updatedAt: "2024-03-11T12:00:00.000Z",
    cookedAt: "2024-03-15",
  };

  describe("addCookingRecord", () => {
    it("존재하는 ID로 추가하려고 하면 에러를 발생시킨다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(mockRecord1);

      expect(() => cookingRecordRepository.addCookingRecord(mockRecord1)).toThrow(
        new CookingRecordError(CookingRecordErrorCode.DUPLICATED_ID),
      );
    });

    it("새로운 기록을 추가하고 날짜를 업데이트한다 (해당하는 날짜에 첫 번째 기록일 경우)", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(null);
      (cookingRecordStorage.getAllCookingRecordsByDate as jest.Mock).mockReturnValue([]);
      (cookingRecordStorage.getDatesByMonth as jest.Mock).mockReturnValue([1, 2]);

      cookingRecordRepository.addCookingRecord(mockRecord1);

      // new Date("2024-03-15") is parsed as UTC by default but behaves as locale. Wait, getYearMonthDate parses it.
      // Let's assume getYearMonthDate handles "2024-03-15" properly as (2024, 3, 15) due to the local timezone. We mocked it to use Date methods.
      // Actually new Date("2024-03-15") -> Midnight UTC, which is KST 09:00 on the 15th. So d.getDate() is 15.

      expect(cookingRecordStorage.setDatesByMonth).toHaveBeenCalledWith(2024, 3, [1, 2, 15]);
      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 15, ["record-1"]);
      expect(cookingRecordStorage.addCookingRecord).toHaveBeenCalledWith(mockRecord1);
    });

    it("새로운 기록을 추가한다 (해당하는 날짜에 기존 기록이 있는 경우)", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(null);
      (cookingRecordStorage.getAllCookingRecordsByDate as jest.Mock).mockReturnValue([mockRecord2]);

      cookingRecordRepository.addCookingRecord(mockRecord1);

      expect(cookingRecordStorage.setDatesByMonth).not.toHaveBeenCalled();

      // mockRecord1 (createdAt: 10th) < mockRecord2 (createdAt: 11th). Oh it sorts by updatedAt.
      // mockRecord1(10th) vs mockRecord2(11th) => 10th is first.
      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 15, ["record-1", "record-2"]);
      expect(cookingRecordStorage.addCookingRecord).toHaveBeenCalledWith(mockRecord1);
    });
  });

  describe("updateCookingRecord", () => {
    it("존재하지 않는 ID를 업데이트하려고 하면 에러를 발생시킨다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(null);

      expect(() => cookingRecordRepository.updateCookingRecord("record-1", {})).toThrow(
        new CookingRecordError(CookingRecordErrorCode.NOT_FOUND),
      );
    });

    it("날짜 변경이 없는 경우 속성만 업데이트한다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(mockRecord1);

      cookingRecordRepository.updateCookingRecord("record-1", { name: "수정된계란말이" });

      expect(cookingRecordStorage.updateCookingRecord).toHaveBeenCalledWith("record-1", {
        ...mockRecord1,
        name: "수정된계란말이",
      });
      expect(cookingRecordStorage.setIds).not.toHaveBeenCalled();
    });

    it("날짜가 변경되는 경우 기존 날짜에서 제거하고 새 날짜에 추가한다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(mockRecord1);
      (cookingRecordStorage.getAllCookingRecordsByDate as jest.Mock).mockImplementation((year, month, date) =>
        date === 15 ? [mockRecord1] : [],
      );
      (cookingRecordStorage.getDatesByMonth as jest.Mock).mockImplementation((year, month) => [15]);

      const newCookedAt = "2024-03-16";

      cookingRecordRepository.updateCookingRecord("record-1", { cookedAt: newCookedAt });

      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 15, []);
      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 16, ["record-1"]);

      expect(cookingRecordStorage.setDatesByMonth).toHaveBeenCalledWith(2024, 3, [16]);

      expect(cookingRecordStorage.updateCookingRecord).toHaveBeenCalledWith("record-1", {
        ...mockRecord1,
        cookedAt: newCookedAt,
      });
    });
  });

  describe("removeCookingRecord", () => {
    it("존재하지 않는 ID면 무시한다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(null);

      cookingRecordRepository.removeCookingRecord("record-1");

      expect(cookingRecordStorage.removeCookingRecord).not.toHaveBeenCalled();
    });

    it("기록을 삭제하고, 해당 날짜의 마지막 기록이면 datesByMonth도 업데이트한다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(mockRecord1);
      (cookingRecordStorage.getAllCookingRecordsByDate as jest.Mock).mockReturnValue([mockRecord1]);
      (cookingRecordStorage.getDatesByMonth as jest.Mock).mockReturnValue([1, 15]);

      cookingRecordRepository.removeCookingRecord("record-1");

      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 15, []);
      expect(cookingRecordStorage.setDatesByMonth).toHaveBeenCalledWith(2024, 3, [1]);
      expect(cookingRecordStorage.removeCookingRecord).toHaveBeenCalledWith("record-1");
    });

    it("기록을 삭제하지만, 다른 기록이 남아있으면 datesByMonth는 유지한다", () => {
      (cookingRecordStorage.getCookingRecord as jest.Mock).mockReturnValue(mockRecord1);
      (cookingRecordStorage.getAllCookingRecordsByDate as jest.Mock).mockReturnValue([mockRecord1, mockRecord2]);

      cookingRecordRepository.removeCookingRecord("record-1");

      expect(cookingRecordStorage.setIds).toHaveBeenCalledWith(2024, 3, 15, ["record-2"]);
      expect(cookingRecordStorage.setDatesByMonth).not.toHaveBeenCalled();
      expect(cookingRecordStorage.removeCookingRecord).toHaveBeenCalledWith("record-1");
    });
  });
});
