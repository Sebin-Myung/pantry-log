import { act, renderHook } from "@testing-library/react-native";
import { useRecipeStore } from "../store";
import { Recipe } from "../types";
import { useRecipeDropdown } from "./useRecipeDropdown";

jest.mock("../store", () => ({
  useRecipeStore: jest.fn(),
}));

describe("useRecipeDropdown", () => {
  const hydrateMock = jest.fn();
  const mockRecipes = [
    { id: "rec-1", name: "김치찌개" },
    { id: "rec-2", name: "부대찌개" },
  ] as Recipe[];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRecipeStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        isLoading: false,
        hydrate: hydrateMock,
        recipes: mockRecipes,
      };
      return selector(state);
    });
  });

  it("마운트 시점(useEffect)에 hydrate를 호출한다", () => {
    renderHook(() => useRecipeDropdown({ setSelectedRecipe: jest.fn() }));
    expect(hydrateMock).toHaveBeenCalledTimes(1);
  });

  it("스토어의 recipe 데이터에 기반하여 recipeLabelValues를 반환한다", () => {
    const { result } = renderHook(() => useRecipeDropdown({ setSelectedRecipe: jest.fn() }));

    expect(result.current.recipeLabelValues).toHaveLength(2);
    expect(result.current.recipeLabelValues[0].label).toBe("김치찌개");
    expect(result.current.recipeLabelValues[0].value.id).toBe("rec-1");
  });

  describe("onRecipeChange", () => {
    it("선택된 recipe 객체를 받고, 해당 객체의 LabelValue를 찾아 setSelectedRecipe를 호출한다", () => {
      const setSelectedRecipe = jest.fn();
      const { result } = renderHook(() => useRecipeDropdown({ setSelectedRecipe }));

      act(() => {
        result.current.onRecipeChange({ id: "rec-2" } as Recipe);
      });

      expect(setSelectedRecipe).toHaveBeenCalledWith({
        label: "부대찌개",
        value: mockRecipes[1],
      });
    });

    it("일치하는 값이 없으면 setSelectedRecipe를 호출하지 않는다", () => {
      const setSelectedRecipe = jest.fn();
      const { result } = renderHook(() => useRecipeDropdown({ setSelectedRecipe }));

      act(() => {
        result.current.onRecipeChange({ id: "rec-not-exist" } as Recipe);
      });

      expect(setSelectedRecipe).not.toHaveBeenCalled();
    });
  });
});
