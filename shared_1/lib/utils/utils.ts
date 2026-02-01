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
