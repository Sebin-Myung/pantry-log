import {
  calculateDday,
  compareDateAsc,
  getDateFormat,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getYearMonthDate,
  isSameDate,
  normalizeDate,
} from "./date";

describe("date 유틸리티 함수", () => {
  describe("compareDateAsc", () => {
    it("두 날짜를 오름차순으로 비교해야 한다", () => {
      expect(compareDateAsc("2026-02-01", "2026-02-02")).toBeLessThan(0);
      expect(compareDateAsc("2026-02-03", "2026-02-02")).toBeGreaterThan(0);
      expect(compareDateAsc("2026-02-02", "2026-02-02")).toBe(0);
    });

    it("값이 없으면 후순위로 밀어야 한다", () => {
      expect(compareDateAsc(null, "2026-02-01")).toBeGreaterThan(0);
      expect(compareDateAsc("2026-02-01", null)).toBeLessThan(0);
      expect(compareDateAsc(null, null)).toBe(0);
    });
  });

  describe("getYearMonthDate", () => {
    it("주어진 날짜에서 연도, 월, 일을 올바르게 추출해야 한다", () => {
      const date = new Date(2026, 1, 15); // 월은 0-indexed 이므로 1은 2월
      expect(getYearMonthDate(date)).toEqual({ year: 2026, month: 1, date: 15 });
    });
  });

  describe("isSameDate", () => {
    it("두 날짜가 같은 날(시간 무시)인지 비교해야 한다", () => {
      const a = new Date(2026, 1, 15, 10, 0, 0);
      const b = new Date(2026, 1, 15, 20, 0, 0);
      const c = new Date(2026, 1, 16);

      expect(isSameDate(a, b)).toBe(true);
      expect(isSameDate(a, c)).toBe(false);
    });
  });

  describe("getFirstDayOfMonth", () => {
    it("해당 월의 첫 번째 날을 반환해야 한다", () => {
      const firstDay = getFirstDayOfMonth(2026, 1);
      expect(firstDay.getDate()).toBe(1);
    });
  });

  describe("getLastDayOfMonth", () => {
    it("해당 월의 마지막 날을 반환해야 한다", () => {
      const lastDay = getLastDayOfMonth(2026, 1); // 2026년 2월
      expect(lastDay.getDate()).toBe(28); // 2026년은 평년
    });
  });

  describe("getDateFormat", () => {
    it("날짜 객체를 YYYY-MM-DD 형식으로 포맷팅해야 한다", () => {
      const date = new Date(2026, 1, 5); // 2026-02-05
      expect(getDateFormat(date)).toBe("2026-02-05");
    });
  });

  describe("normalizeDate", () => {
    it("날짜의 시, 분, 초, 밀리초를 0으로 초기화해야 한다", () => {
      const date = new Date(2026, 1, 5, 15, 30, 45);
      const normalized = normalizeDate(date);
      expect(normalized.getHours()).toBe(0);
      expect(normalized.getMinutes()).toBe(0);
      expect(normalized.getSeconds()).toBe(0);
    });
  });

  describe("calculateDday", () => {
    beforeAll(() => {
      // 시간을 고정시킴
      jest.useFakeTimers().setSystemTime(new Date("2026-02-20T00:00:00.000Z"));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("디데이를 정상적으로 계산해야 한다", () => {
      expect(calculateDday(new Date("2026-02-25T00:00:00.000Z"))).toBe("D-5"); // 5일 남음
      expect(calculateDday(new Date("2026-02-20T00:00:00.000Z"))).toBe("D-Day"); // 당일
      expect(calculateDday(new Date("2026-02-18T00:00:00.000Z"))).toBe("D+2"); // 2일 지남
    });
  });
});
