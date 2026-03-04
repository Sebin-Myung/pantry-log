import { act, renderHook } from "@testing-library/react-native";
import { useSubmit } from "./useSubmit";

describe("useSubmit 훅", () => {
  it("초기 isSubmitting 상태는 false여야 한다", () => {
    const { result } = renderHook(() => useSubmit());
    expect(result.current.isSubmitting).toBe(false);
  });

  it("handleSubmit 호출 시 isSubmitting이 true가 되었다가 완료되면 false로 돌아와야 한다", async () => {
    const { result } = renderHook(() => useSubmit());

    const mockSubmitFunction = jest.fn().mockReturnValue(Promise.resolve());

    await act(async () => {
      await result.current.handleSubmit(mockSubmitFunction);
    });

    expect(mockSubmitFunction).toHaveBeenCalledTimes(1);
    expect(result.current.isSubmitting).toBe(false);
  });

  it("이미 제출 중(isSubmitting=true)일 경우 다시 호출되지 않아야 한다", async () => {
    const { result } = renderHook(() => useSubmit());

    let resolvePromise: (value: void | PromiseLike<void>) => void;
    const mockSubmitFunction = jest.fn().mockImplementation(() => {
      return new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });
    });

    act(() => {
      result.current.handleSubmit(mockSubmitFunction);
    });

    act(() => {
      // isSubmitting이 true인 상태에서 다시 호출
      result.current.handleSubmit(mockSubmitFunction);
    });

    expect(mockSubmitFunction).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolvePromise!(); // 첫 번째 호출 완료 처리
    });

    expect(result.current.isSubmitting).toBe(false);
  });
});
