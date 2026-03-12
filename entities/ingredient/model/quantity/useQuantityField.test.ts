import { act, renderHook } from "@testing-library/react-native";
import { QUANTITY_UNIT_LABEL_VALUES } from "./constants";
import { useQuantityField } from "./useQuantityField";

describe("useQuantityField", () => {
  it("value가 존재하면 isQuantityEnabled가 true여야 한다", () => {
    const { result } = renderHook(() => useQuantityField({ value: { amount: "10" }, setValue: jest.fn() }));
    expect(result.current.isQuantityEnabled).toBe(true);
  });

  it("value가 undefined면 isQuantityEnabled가 false여야 한다", () => {
    const { result } = renderHook(() => useQuantityField({ value: undefined, setValue: jest.fn() }));
    expect(result.current.isQuantityEnabled).toBe(false);
  });

  describe("onQuantityOptionChange", () => {
    it("false가 전달되면 setValue(undefined)를 호출한다", () => {
      const setValue = jest.fn();
      const { result } = renderHook(() => useQuantityField({ value: { amount: "10" }, setValue }));

      act(() => {
        result.current.onQuantityOptionChange(false);
      });

      expect(setValue).toHaveBeenCalledWith(undefined);
    });

    it("true가 전달되면 setValue({ amount: '' })를 호출한다", () => {
      const setValue = jest.fn();
      const { result } = renderHook(() => useQuantityField({ value: undefined, setValue }));

      act(() => {
        result.current.onQuantityOptionChange(true);
      });

      expect(setValue).toHaveBeenCalledWith({ amount: "" });
    });
  });

  describe("onQuantityAmountChange", () => {
    it("amount 값에 대해 onlyPositiveFloat를 적용한 객체를 setValue로 호출한다", () => {
      const setValue = jest.fn();
      // "10.5" -> "10.5"
      const { result } = renderHook(() => useQuantityField({ value: undefined, setValue }));

      act(() => {
        result.current.onQuantityAmountChange("10.5");
      });

      expect(setValue).toHaveBeenCalledWith(expect.objectContaining({ amount: "10.5" }));
    });
  });

  describe("onQuantityUnitChange", () => {
    it("유효한 unit이 전달되면 해당 LabelValue 객체를 setValue로 호출한다", () => {
      const setValue = jest.fn();
      const { result } = renderHook(() => useQuantityField({ value: undefined, setValue }));

      act(() => {
        result.current.onQuantityUnitChange("g");
      });

      expect(setValue).toHaveBeenCalledWith(
        expect.objectContaining({
          unit: QUANTITY_UNIT_LABEL_VALUES.find((v) => v.value === "g"),
        }),
      );
    });

    it("유효하지 않은 unit이 전달되면 setValue를 호출하지 않는다", () => {
      const setValue = jest.fn();
      const { result } = renderHook(() => useQuantityField({ value: undefined, setValue }));

      act(() => {
        result.current.onQuantityUnitChange("invalid-unit");
      });

      expect(setValue).not.toHaveBeenCalled();
    });
  });
});
