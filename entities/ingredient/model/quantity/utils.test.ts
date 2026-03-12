import { getQuantityUnitLabelValueFromValue, isValidQuantity } from "./utils";

describe("ingredient/quantity/utils", () => {
  describe("getQuantityUnitLabelValueFromValue", () => {
    it("단위에 해당하는 LabelValue 객체를 반환한다", () => {
      const result = getQuantityUnitLabelValueFromValue("g");
      expect(result?.value).toBe("g");
      expect(result?.label).toBe("g"); // constant.ts 에서 정의된 라벨 검증
    });
  });

  describe("isValidQuantity", () => {
    it("quantity가 undefined이면 true를 반환한다 (생략된 경우 정상)", () => {
      expect(isValidQuantity(undefined)).toBe(true);
    });

    it("amount가 > 0 이고 unit이 존재하면 true를 반환한다", () => {
      expect(isValidQuantity({ amount: "10", unit: { label: "g", value: "g" } })).toBe(true);
    });

    it("amount가 없거나 0 이하이면 false를 반환한다", () => {
      expect(isValidQuantity({ amount: "", unit: { label: "g", value: "g" } })).toBe(false);
      expect(isValidQuantity({ amount: "0", unit: { label: "g", value: "g" } })).toBe(false);
    });

    it("unit이 없으면 false를 반환한다", () => {
      expect(isValidQuantity({ amount: "10", unit: undefined })).toBe(false);
    });
  });
});
