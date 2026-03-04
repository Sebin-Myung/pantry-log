import { hasBatchim, hasFinalConsonant } from "./string";

describe("string 유틸리티 함수", () => {
  describe("hasFinalConsonant", () => {
    it("한 글자에 받침이 있는지 확인해야 한다", () => {
      expect(hasFinalConsonant("가")).toBe(false);
      expect(hasFinalConsonant("각")).toBe(true);
      expect(hasFinalConsonant("값")).toBe(true);
      expect(hasFinalConsonant("빵")).toBe(true);
      expect(hasFinalConsonant("아")).toBe(false);
    });

    it("한글이 아닌 경우 false를 반환해야 한다", () => {
      expect(hasFinalConsonant("A")).toBe(false);
      expect(hasFinalConsonant("1")).toBe(false);
      expect(hasFinalConsonant(" ")).toBe(false);
    });

    it("입력이 올바르지 않으면 false를 반환해야 한다", () => {
      expect(hasFinalConsonant("")).toBe(false);
      expect(hasFinalConsonant("가나")).toBe(false); // 1글자가 아님
    });
  });

  describe("hasBatchim", () => {
    it("문자열의 마지막 문자에 받침이 있는지 확인해야 한다", () => {
      expect(hasBatchim("우유")).toBe(false);
      expect(hasBatchim("사과")).toBe(false);
      expect(hasBatchim("수박")).toBe(true);
      expect(hasBatchim("체리")).toBe(false);
      expect(hasBatchim("레몬")).toBe(true);
    });

    it("문자열이 비어있으면 false를 반환해야 한다", () => {
      expect(hasBatchim("")).toBe(false);
    });
  });
});
