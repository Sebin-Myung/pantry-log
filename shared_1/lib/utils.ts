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

/**
 * 한글 받침이 있는지 여부.
 * 한글이 아니거나 받침이 없으면 false
 */
export const hasFinalConsonant = (char: string) => {
  if (!char || char.length !== 1) return false;

  const code = char.charCodeAt(0);

  // 한글 완성형 범위: 가 ~ 힣
  if (code < 0xac00 || code > 0xd7a3) return false;

  return (code - 0xac00) % 28 !== 0;
};

/**
 * 마지막 문자에 한글 받침이 있는지.
 */
export const hasBatchim = (word: string) => {
  if (!word) return false;

  const lastChar = word[word.length - 1];
  return hasFinalConsonant(lastChar);
};

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay?: number) => {
  const timerDelay = delay ?? 300;
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, timerDelay);
  };
};

export const padZero = (n: number, digit?: number) => {
  return String(n).padStart(digit ?? 2, "0");
};
