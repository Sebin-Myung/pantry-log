export const onlyPositiveFloat = (value: string) => {
  let cleaned = value.replace(/[^0-9.]/g, ""); // 숫자 + . 허용
  cleaned = cleaned.replace(/^0+(?=\d)/, ""); // 선행 0 제거 (0 다음에 숫자가 오는 경우)

  const parts = cleaned.split(".");
  if (parts.length > 1) {
    return parts[0] + "." + parts.slice(1).join("");
  }
  return cleaned;
};

export const padZero = (n: number, digit?: number) => {
  return String(n).padStart(digit ?? 2, "0");
};
