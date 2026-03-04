import { act, renderHook } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import { useRouterFunc } from "./useRouterFunc";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("useRouterFunc 훅", () => {
  it("뒤로 가기(goBack) 기능을 올바르게 수행해야 한다", () => {
    const mockBack = jest.fn();
    const mockCanGoBack = jest.fn().mockReturnValue(true);

    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      canGoBack: mockCanGoBack,
    });

    const { result } = renderHook(() => useRouterFunc());

    act(() => {
      result.current.goBack();
    });

    expect(mockCanGoBack).toHaveBeenCalledTimes(1);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("canGoBack이 false일 때는 뒤로 가기(back)를 호출하지 않아야 한다", () => {
    const mockBack = jest.fn();
    const mockCanGoBack = jest.fn().mockReturnValue(false);

    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      canGoBack: mockCanGoBack,
    });

    const { result } = renderHook(() => useRouterFunc());

    act(() => {
      result.current.goBack();
    });

    expect(mockCanGoBack).toHaveBeenCalledTimes(1);
    expect(mockBack).not.toHaveBeenCalled();
  });
});
