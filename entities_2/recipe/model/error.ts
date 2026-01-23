export const RecipeErrorCode = {
  NOT_FOUND: "RECIPE_NOT_FOUND",
  DUPLICATED_ID: "RECIPE_DUPLICATED_ID",
  DUPLICATED_NAME: "RECIPE_DUPLICATED_NAME",
} as const;

export type RecipeErrorCode = (typeof RecipeErrorCode)[keyof typeof RecipeErrorCode];

export const RecipeErrorString: Record<RecipeErrorCode, string> = {
  RECIPE_NOT_FOUND: "레시피를 찾을 수 없습니다.",
  RECIPE_DUPLICATED_ID: "이미 존재하는 레시피입니다.",
  RECIPE_DUPLICATED_NAME: "이미 존재하는 레시피 이름입니다.",
};

export class RecipeError extends Error {
  name = "RecipeError";

  constructor(public code: RecipeErrorCode) {
    super(code);
  }
}
