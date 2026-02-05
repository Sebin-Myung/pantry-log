export const onlyPositiveFloat = (value: string) => {
  return value
    .replace(/[^0-9.]/g, "") // 숫자 + .
    .replace(/(\..*)\./g, "$1") // 소수점 1개만
    .replace(/^0+(?=\d)/, ""); // 앞자리 0 제거
};

export const padZero = (n: number, digit?: number) => {
  return String(n).padStart(digit ?? 2, "0");
};
