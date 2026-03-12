import { calculateDday, compareDateAsc } from "@shared";
import { QuantityUnitKorean } from "./constants";
import { ExpiryStatus, Ingredient } from "./types";
import { getExpiryStatus, getIngredientKeys, getQuantityString, sortIngredients } from "./utils";

jest.mock("@shared", () => ({
  compareDateAsc: jest.fn(),
  calculateDday: jest.fn(),
}));

describe("ingredient/model/utils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("sortIngredients", () => {
    const defaultIng: Ingredient = {
      id: "1",
      name: "A",
      storageLocation: "fridge",
      brand: null,
      purchaseSource: null,
      quantity: null,
      purchaseDate: "2024-01-01",
      productionDate: null,
      expirationDate: null,
      imageUrl: null,
    };

    it("소비기한이 빠른 순으로 정렬한다", () => {
      (compareDateAsc as jest.Mock).mockImplementation((a, b) => {
        if (a === "late" && b === "early") return 1;
        if (a === "early" && b === "late") return -1;
        return 0;
      });

      const early = { ...defaultIng, id: "earlyIng", name: "B", expirationDate: "early" };
      const late = { ...defaultIng, id: "lateIng", name: "A", expirationDate: "late" };

      const result = sortIngredients([late, early]);
      expect(result[0].id).toBe("earlyIng");
    });

    it("소비기한이 같다면 제조일자 빠른 순으로 정렬한다", () => {
      (compareDateAsc as jest.Mock).mockImplementation((a, b) => {
        if (a === "same" && b === "same") return 0;
        if (a === "late" && b === "early") return 1;
        if (a === "early" && b === "late") return -1;
        return 0;
      });

      const early = { ...defaultIng, id: "earlyIng", expirationDate: "same", productionDate: "early" };
      const late = { ...defaultIng, id: "lateIng", expirationDate: "same", productionDate: "late" };

      const result = sortIngredients([late, early]);
      expect(result[0].id).toBe("earlyIng");
    });
  });

  describe("getIngredientKeys", () => {
    it("Ingredient 배열에서 id 배열을 추출한다", () => {
      expect(getIngredientKeys([{ id: "1" } as Ingredient, { id: "pantry" } as Ingredient])).toEqual(["1", "pantry"]);
    });
  });

  describe("getQuantityString", () => {
    it("단위를 한글로 변환하여 출력한다", () => {
      expect(getQuantityString({ amount: 500, unit: "g" })).toBe(`500${QuantityUnitKorean.g}`);
      expect(getQuantityString({ amount: 500, unit: "ml" })).toBe(`500${QuantityUnitKorean.ml}`);
      expect(getQuantityString({ amount: 5, unit: "pcs" })).toBe(`5${QuantityUnitKorean.pcs}`);
    });

    it("amount가 1000을 초과하면 k 단위 문자를 붙인다", () => {
      // 1500g -> 1.5kg
      expect(getQuantityString({ amount: 1500, unit: "g" })).toBe(`1.5k${QuantityUnitKorean.g}`);
    });
  });

  describe("getExpiryStatus", () => {
    it("expirationDate가 없으면 null을 반환한다", () => {
      expect(getExpiryStatus(null)).toBeNull();
    });

    it("지났다면 EXPIRED를 반환한다", () => {
      (calculateDday as jest.Mock).mockReturnValue("D+2");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.EXPIRED);
    });

    it("D-Day 거나 3일 이하로 남았다면 IMMINENT를 반환한다", () => {
      (calculateDday as jest.Mock).mockReturnValue("D-Day");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.IMMINENT);

      (calculateDday as jest.Mock).mockReturnValue("D-1");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.IMMINENT);

      (calculateDday as jest.Mock).mockReturnValue("D-3");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.IMMINENT);
    });

    it("4일~7일 남았다면 APPROACHING을 반환한다", () => {
      (calculateDday as jest.Mock).mockReturnValue("D-4");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.APPROACHING);

      (calculateDday as jest.Mock).mockReturnValue("D-7");
      expect(getExpiryStatus("2024-01-01")).toBe(ExpiryStatus.APPROACHING);
    });

    it("7일보다 많이 남았다면 null을 반환한다", () => {
      (calculateDday as jest.Mock).mockReturnValue("D-8");
      expect(getExpiryStatus("2024-01-01")).toBeNull();
    });
  });
});
