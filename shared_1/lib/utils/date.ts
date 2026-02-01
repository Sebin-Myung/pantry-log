export const compareDateAsc = (a?: string | null, b?: string | null): number => {
  if (!a && !b) return 0;
  if (!a) return 1; // a가 없으면 뒤로
  if (!b) return -1; // b가 없으면 뒤로

  return new Date(a).getTime() - new Date(b).getTime();
};
