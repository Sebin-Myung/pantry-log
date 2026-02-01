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
