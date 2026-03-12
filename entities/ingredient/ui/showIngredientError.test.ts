import { showErrorAlert } from "@shared";
import { IngredientError, IngredientErrorCode, IngredientErrorString } from "../model";
import { showIngredientError } from "./showIngredientError";

jest.mock("@shared", () => ({
  showErrorAlert: jest.fn(),
}));

describe("showIngredientError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("에러 코드를 메시지로 변환하여 showErrorAlert를 호출한다", () => {
    const error = new IngredientError(IngredientErrorCode.NOT_FOUND);
    showIngredientError({ error });

    expect(showErrorAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        message: IngredientErrorString[IngredientErrorCode.NOT_FOUND],
      }),
    );
  });
});
