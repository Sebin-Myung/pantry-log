import { applyAlpha, debounce } from "./utils";

describe("utils 공통 함수", () => {
  describe("applyAlpha", () => {
    it("rgba 형식의 경우 알파 값을 교체해야 한다", () => {
      expect(applyAlpha("rgba(255, 0, 0, 1)", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
      expect(applyAlpha("rgba(255, 0, 0, 0.8)", 0.1)).toBe("rgba(255, 0, 0, 0.1)");
    });

    it("rgb 형식의 경우 rgba 형식으로 변환해야 한다", () => {
      expect(applyAlpha("rgb(0, 255, 0)", 0.3)).toBe("rgba(0, 255, 0, 0.3)");
    });

    it("hex 형식의 경우 rgba 형식으로 변환해야 한다", () => {
      expect(applyAlpha("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
      expect(applyAlpha("#f00", 0.5)).toBe("rgba(255, 0, 0, 0.5)"); // 3자리 hex
      expect(applyAlpha("#00ff00", 1)).toBe("rgba(0, 255, 0, 1)");
    });

    it("올바른 형식이 아닐 경우 원본 문자열을 반환해야 한다", () => {
      expect(applyAlpha("red", 0.5)).toBe("red");
    });
  });

  describe("debounce", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("연속적인 호출이 발생하면 마지막 호출만 수행해야 한다", () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 200);

      debouncedFn(1);
      debouncedFn(2);
      debouncedFn(3);

      expect(mockFn).not.toHaveBeenCalled();

      // 타이머가 만료되도록 시간을 앞당김
      jest.advanceTimersByTime(200);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith(3);
    });
  });
});
