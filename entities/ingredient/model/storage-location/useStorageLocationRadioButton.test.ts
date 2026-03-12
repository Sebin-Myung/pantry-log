import { act, renderHook } from "@testing-library/react-native";
import { STORAGE_LOCATION_LABEL_VALUES } from "./constants";
import { useStorageLocationRadioButton } from "./useStorageLocationRadioButton";

describe("useStorageLocationRadioButton", () => {
  it("초기 상태를 반환한다", () => {
    const selectedLocation = { label: "냉장", value: "fridge" as const };
    const { result } = renderHook(() =>
      useStorageLocationRadioButton({ selectedLocation, setSelectedLocation: jest.fn() }),
    );

    expect(result.current.items).toEqual(STORAGE_LOCATION_LABEL_VALUES);
    expect(result.current.selectedLocation).toEqual(selectedLocation);
  });

  describe("onValueChange", () => {
    it("유효한 value가 전달되면 setSelectedLocation을 해당 LabelValue로 호출한다", () => {
      const setSelectedLocation = jest.fn();
      const { result } = renderHook(() =>
        useStorageLocationRadioButton({ selectedLocation: undefined, setSelectedLocation }),
      );

      act(() => {
        result.current.onValueChange("frozen");
      });

      expect(setSelectedLocation).toHaveBeenCalledWith(STORAGE_LOCATION_LABEL_VALUES.find((v) => v.value === "frozen"));
    });

    it("유효하지 않은 value가 전달되면 setSelectedLocation을 호출하지 않는다", () => {
      const setSelectedLocation = jest.fn();
      const { result } = renderHook(() =>
        useStorageLocationRadioButton({ selectedLocation: undefined, setSelectedLocation }),
      );

      act(() => {
        result.current.onValueChange("invalid-location");
      });

      expect(setSelectedLocation).not.toHaveBeenCalled();
    });
  });
});
