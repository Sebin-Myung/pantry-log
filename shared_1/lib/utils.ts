export const applyAlpha = (color: string, alpha: number) => {
  // rgba(...) -> replace alpha
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\(([^,]+),\s*([^,]+),\s*([^,]+),\s*[\d.]+\)/, `rgba($1, $2, $3, ${alpha})`);
  }

  // rgb(...) -> convert to rgba(...)
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  // hex -> convert to rgba(...)
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const hexNormalized =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const r = parseInt(hexNormalized.slice(0, 2), 16);
    const g = parseInt(hexNormalized.slice(2, 4), 16);
    const b = parseInt(hexNormalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // fallback: return original color
  return color;
};

export const onlyPositiveFloat = (value: string) => {
  return value
    .replace(/[^0-9.]/g, "") // 숫자 + .
    .replace(/(\..*)\./g, "$1") // 소수점 1개만
    .replace(/^0+(?=\d)/, ""); // 앞자리 0 제거
};

export const compareDateAsc = (a?: string | null, b?: string | null): number => {
  if (!a && !b) return 0;
  if (!a) return 1; // a가 없으면 뒤로
  if (!b) return -1; // b가 없으면 뒤로

  return new Date(a).getTime() - new Date(b).getTime();
};
