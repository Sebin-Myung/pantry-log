import { getStorageLocationLabelValueFromValue } from "./utils";

describe("ingredient/storage-location/utils", () => {
  describe("getStorageLocationLabelValueFromValue", () => {
    it("장소에 해당하는 LabelValue 객체를 반환한다", () => {
      const result = getStorageLocationLabelValueFromValue("fridge");
      expect(result?.value).toBe("fridge");
      expect(result?.label).toBe("냉장");
    });

    it("냉동 장소에 해당하는 LabelValue 객체를 반환한다", () => {
      const result = getStorageLocationLabelValueFromValue("frozen");
      expect(result?.value).toBe("frozen");
      expect(result?.label).toBe("냉동");
    });
  });
});
