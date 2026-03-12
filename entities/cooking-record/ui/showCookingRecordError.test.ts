import { showErrorAlert } from "@shared";
import { CookingRecordError, CookingRecordErrorCode, CookingRecordErrorString } from "../model";
import { showCookingRecordError } from "./showCookingRecordError";

jest.mock("@shared", () => ({
  showErrorAlert: jest.fn(),
}));

describe("showCookingRecordError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("에러 코드를 메시지로 변환하여 showErrorAlert를 호출한다", () => {
    const error = new CookingRecordError(CookingRecordErrorCode.NOT_FOUND);
    showCookingRecordError({ error });

    expect(showErrorAlert).toHaveBeenCalledWith(
      expect.objectContaining({
        message: CookingRecordErrorString[CookingRecordErrorCode.NOT_FOUND],
      }),
    );
  });
});
