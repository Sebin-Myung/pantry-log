import { onlyPositiveFloat, padZero } from "./number";

describe("number 유틸리티 함수", () => {
  describe("onlyPositiveFloat", () => {
    it("숫자와 소수점만 남기고 제거해야 한다", () => {
      expect(onlyPositiveFloat("abc12.34def")).toBe("12.34");
      expect(onlyPositiveFloat("-123.45")).toBe("123.45"); // 음수 기호 제거
    });

    it("소수점은 한 개만 유지되어야 한다", () => {
      expect(onlyPositiveFloat("12.3.4")).toBe("12.34");
      expect(onlyPositiveFloat("0...5")).toBe("0.5");
    });

    it("불필요한 선행 0은 제거되어야 한다", () => {
      expect(onlyPositiveFloat("00123.45")).toBe("123.45");
      expect(onlyPositiveFloat("0.5")).toBe("0.5");
      expect(onlyPositiveFloat("00.5")).toBe("0.5");
    });
  });

  describe("padZero", () => {
    it("한 자리 숫자 앞에 0을 붙여 두 자리로 만들어야 한다", () => {
      expect(padZero(5)).toBe("05");
      expect(padZero(9)).toBe("09");
    });

    it("두 자리 이상 숫자는 그대로 반환해야 한다", () => {
      expect(padZero(10)).toBe("10");
      expect(padZero(123)).toBe("123");
    });

    it("자릿수를 지정할 수 있어야 한다", () => {
      expect(padZero(5, 3)).toBe("005");
    });
  });
});
