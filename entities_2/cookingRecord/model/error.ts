export const CookingRecordErrorCode = {
  NOT_FOUND: "COOKING_RECORD_NOT_FOUND",
  DUPLICATED_ID: "COOKING_RECORD_DUPLICATED_ID",
} as const;

export type CookingRecordErrorCode = (typeof CookingRecordErrorCode)[keyof typeof CookingRecordErrorCode];

export const CookingRecordErrorString: Record<CookingRecordErrorCode, string> = {
  COOKING_RECORD_NOT_FOUND: "요리 기록을 찾을 수 없습니다.",
  COOKING_RECORD_DUPLICATED_ID: "이미 존재하는 요리 기록입니다.",
};

export class CookingRecordError extends Error {
  name = "CookingRecordError";

  constructor(public code: CookingRecordErrorCode) {
    super(code);
  }
}
