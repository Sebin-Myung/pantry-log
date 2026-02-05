export const IngredientErrorCode = {
  NOT_FOUND: "INGREDIENT_NOT_FOUND",
  DUPLICATED_ID: "INGREDIENT_DUPLICATED_ID",
  DUPLICATED_NAME: "INGREDIENT_DUPLICATED_NAME",
} as const;

export type IngredientErrorCode = (typeof IngredientErrorCode)[keyof typeof IngredientErrorCode];

export const IngredientErrorString: Record<IngredientErrorCode, string> = {
  INGREDIENT_NOT_FOUND: "재료를 찾을 수 없습니다.",
  INGREDIENT_DUPLICATED_ID: "이미 존재하는 재료입니다.",
  INGREDIENT_DUPLICATED_NAME: "이미 존재하는 재료 이름입니다.",
};

export class IngredientError extends Error {
  name = "IngredientError";

  constructor(public code: IngredientErrorCode) {
    super(code);
  }
}
