import { showErrorAlert } from "@shared";
import { RecipeError, RecipeErrorCode, RecipeErrorString } from "../model";
import { showRecipeError } from "./showRecipeError";

jest.mock("@shared", () => ({
  showErrorAlert: jest.fn(),
}));

describe("showRecipeError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("에러 코드를 메시지로 변환하여 showErrorAlert를 호출한다", () => {
    const error = new RecipeError(RecipeErrorCode.NOT_FOUND);
    showRecipeError({ error });

    expect(showErrorAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        message: RecipeErrorString[RecipeErrorCode.NOT_FOUND],
      }),
    );
  });
});
