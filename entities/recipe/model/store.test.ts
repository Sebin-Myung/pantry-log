import { act, renderHook } from "@testing-library/react-native";
import { RecipeError, RecipeErrorCode } from "./error";
import { recipeStorage } from "./storage";
import { useRecipeStore } from "./store";
import { Recipe } from "./types";

jest.mock("./storage", () => ({
  recipeStorage: {
    getAllRecipes: jest.fn(),
    setIds: jest.fn(),
    addRecipe: jest.fn(),
    updateRecipe: jest.fn(),
    removeRecipe: jest.fn(),
  },
}));

describe("useRecipeStore", () => {
  const mockRecipe1: Recipe = {
    id: "recipe-1",
    name: "김치찌개",
    ingredients: [],
    createdAt: "2024-03-01T00:00:00.000Z",
    updatedAt: "2024-03-01T00:00:00.000Z",
  };

  const mockRecipe2: Recipe = {
    id: "recipe-2",
    name: "된장찌개",
    ingredients: [],
    createdAt: "2024-03-02T00:00:00.000Z",
    updatedAt: "2024-03-02T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    useRecipeStore.setState({ isLoading: true, recipes: [] });
  });

  describe("hydrate", () => {
    it("저장소에서 아이템을 불러와 상태를 초기화한다", () => {
      (recipeStorage.getAllRecipes as jest.Mock).mockReturnValue([mockRecipe1]);

      const { result } = renderHook(() => useRecipeStore());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.recipes).toEqual([]);

      act(() => {
        result.current.hydrate();
      });

      expect(recipeStorage.getAllRecipes).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.recipes).toEqual([mockRecipe1]);
    });

    it("이미 로딩이 끝난 상태면 여러 번 호출해도 무시한다", () => {
      useRecipeStore.setState({ isLoading: false, recipes: [mockRecipe1] });
      (recipeStorage.getAllRecipes as jest.Mock).mockReturnValue([mockRecipe1, mockRecipe2]);

      const { result } = renderHook(() => useRecipeStore());

      act(() => {
        result.current.hydrate();
      });

      expect(recipeStorage.getAllRecipes).not.toHaveBeenCalled();
      expect(result.current.recipes).toEqual([mockRecipe1]); // 변경되지 않음
    });
  });

  describe("add", () => {
    beforeEach(() => {
      useRecipeStore.setState({ isLoading: false, recipes: [mockRecipe1] });
    });

    it("이미 존재하는 ID가 있다면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useRecipeStore());

      expect(() => {
        result.current.add(mockRecipe1);
      }).toThrow(new RecipeError(RecipeErrorCode.DUPLICATED_ID));
    });

    it("이미 존재하는 이름이 있다면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useRecipeStore());

      const newRec = { ...mockRecipe2, id: "recipe-100", name: "김치찌개" };

      expect(() => {
        result.current.add(newRec);
      }).toThrow(new RecipeError(RecipeErrorCode.DUPLICATED_NAME));
    });

    it("정상적으로 아이템이 추가되어야 한다", () => {
      const { result } = renderHook(() => useRecipeStore());

      act(() => {
        result.current.add(mockRecipe2);
      });

      expect(recipeStorage.setIds).toHaveBeenCalledWith(expect.arrayContaining(["recipe-1", "recipe-2"]));
      expect(recipeStorage.addRecipe).toHaveBeenCalledWith(mockRecipe2);
      expect(result.current.recipes).toContainEqual(mockRecipe2);
      expect(result.current.recipes.length).toBe(2);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      useRecipeStore.setState({ isLoading: false, recipes: [mockRecipe1, mockRecipe2] });
    });

    it("존재하지 않는 ID를 업데이트 하려고 하면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useRecipeStore());

      expect(() => {
        result.current.update("recipe-999", { name: "새레시피" });
      }).toThrow(new RecipeError(RecipeErrorCode.NOT_FOUND));
    });

    it("변경된 이름이 다른 레시피와 겹치면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useRecipeStore());

      expect(() => {
        result.current.update("recipe-2", { name: "김치찌개" });
      }).toThrow(new RecipeError(RecipeErrorCode.DUPLICATED_NAME));
    });

    it("정상적으로 값이 업데이트 되어야 한다", () => {
      const { result } = renderHook(() => useRecipeStore());

      act(() => {
        result.current.update("recipe-1", { ingredients: [{ name: "돼지고기", quantity: null }] });
      });

      expect(recipeStorage.updateRecipe).toHaveBeenCalledWith(
        "recipe-1",
        expect.objectContaining({ ingredients: [{ name: "돼지고기", quantity: null }] }),
      );
      expect(recipeStorage.setIds).toHaveBeenCalled();

      const updated = result.current.recipes.find((rec) => rec.id === "recipe-1");
      expect(updated?.ingredients[0].name).toBe("돼지고기");
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      useRecipeStore.setState({ isLoading: false, recipes: [mockRecipe1, mockRecipe2] });
    });

    it("정상적으로 삭제되어야 한다", () => {
      const { result } = renderHook(() => useRecipeStore());

      act(() => {
        result.current.remove("recipe-1");
      });

      expect(recipeStorage.setIds).toHaveBeenCalledWith(["recipe-2"]);
      expect(recipeStorage.removeRecipe).toHaveBeenCalledWith("recipe-1");

      expect(result.current.recipes).toHaveLength(1);
      expect(result.current.recipes[0].id).toBe("recipe-2");
    });
  });
});
