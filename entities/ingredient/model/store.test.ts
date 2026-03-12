import { act, renderHook } from "@testing-library/react-native";
import { IngredientError, IngredientErrorCode } from "./error";
import { ingredientStorage } from "./storage";
import { useIngredientStore } from "./store";
import { Ingredient } from "./types";

jest.mock("./storage", () => ({
  ingredientStorage: {
    getAllIngredients: jest.fn(),
    setIds: jest.fn(),
    addIngredient: jest.fn(),
    updateIngredient: jest.fn(),
    removeIngredient: jest.fn(),
  },
}));

describe("useIngredientStore", () => {
  const mockIngredient1: Ingredient = {
    id: "ing-1",
    name: "돼지고기",
    storageLocation: "frozen",
    brand: null,
    purchaseSource: null,
    quantity: null,
    purchaseDate: "2024-03-01T00:00:00.000Z",
    productionDate: null,
    expirationDate: "2024-04-01T00:00:00.000Z",
    imageUrl: null,
  };

  const mockIngredient2: Ingredient = {
    id: "ing-2",
    name: "양파",
    storageLocation: "fridge",
    brand: null,
    purchaseSource: null,
    quantity: null,
    purchaseDate: "2024-03-02T00:00:00.000Z",
    productionDate: null,
    expirationDate: "2024-03-20T00:00:00.000Z",
    imageUrl: null,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    useIngredientStore.setState({ isLoading: true, ingredients: [] });
  });

  describe("hydrate", () => {
    it("저장소에서 아이템을 불러와 상태를 초기화한다", () => {
      (ingredientStorage.getAllIngredients as jest.Mock).mockReturnValue([mockIngredient1]);

      const { result } = renderHook(() => useIngredientStore());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.ingredients).toEqual([]);

      act(() => {
        result.current.hydrate();
      });

      expect(ingredientStorage.getAllIngredients).toHaveBeenCalledTimes(1);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.ingredients).toEqual([mockIngredient1]);
    });

    it("이미 로딩이 끝난 상태면 여러 번 호출해도 무시한다", () => {
      useIngredientStore.setState({ isLoading: false, ingredients: [mockIngredient1] });
      (ingredientStorage.getAllIngredients as jest.Mock).mockReturnValue([mockIngredient1, mockIngredient2]);

      const { result } = renderHook(() => useIngredientStore());

      act(() => {
        result.current.hydrate();
      });

      expect(ingredientStorage.getAllIngredients).not.toHaveBeenCalled();
      expect(result.current.ingredients).toEqual([mockIngredient1]); // 변경되지 않음
    });
  });

  describe("add", () => {
    beforeEach(() => {
      useIngredientStore.setState({ isLoading: false, ingredients: [mockIngredient1] });
    });

    it("이미 존재하는 ID가 있다면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useIngredientStore());

      expect(() => {
        result.current.add(mockIngredient1);
      }).toThrow(new IngredientError(IngredientErrorCode.DUPLICATED_ID));
    });

    it("이미 존재하는 이름이 있다면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useIngredientStore());

      const newIng = { ...mockIngredient2, id: "ing-100", name: "돼지고기" };

      expect(() => {
        result.current.add(newIng);
      }).toThrow(new IngredientError(IngredientErrorCode.DUPLICATED_NAME));
    });

    it("정상적으로 아이템이 추가되어야 한다", () => {
      const { result } = renderHook(() => useIngredientStore());

      act(() => {
        result.current.add(mockIngredient2);
      });

      expect(ingredientStorage.setIds).toHaveBeenCalledWith(expect.arrayContaining(["ing-1", "ing-2"]));
      expect(ingredientStorage.addIngredient).toHaveBeenCalledWith(mockIngredient2);
      expect(result.current.ingredients).toContainEqual(mockIngredient2);
      expect(result.current.ingredients.length).toBe(2);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      useIngredientStore.setState({ isLoading: false, ingredients: [mockIngredient1, mockIngredient2] });
    });

    it("존재하지 않는 ID를 업데이트 하려고 하면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useIngredientStore());

      expect(() => {
        result.current.update("ing-999", { name: "새고기" });
      }).toThrow(new IngredientError(IngredientErrorCode.NOT_FOUND));
    });

    it("변경된 이름이 다른 재료와 겹치면 에러를 발생시킨다", () => {
      const { result } = renderHook(() => useIngredientStore());

      expect(() => {
        result.current.update("ing-2", { name: "돼지고기" });
      }).toThrow(new IngredientError(IngredientErrorCode.DUPLICATED_NAME));
    });

    it("정상적으로 값이 업데이트 되어야 한다", () => {
      const { result } = renderHook(() => useIngredientStore());

      act(() => {
        result.current.update("ing-1", { storageLocation: "fridge" });
      });

      expect(ingredientStorage.updateIngredient).toHaveBeenCalledWith(
        "ing-1",
        expect.objectContaining({ storageLocation: "fridge" }),
      );
      expect(ingredientStorage.setIds).toHaveBeenCalled();

      const updated = result.current.ingredients.find((ing) => ing.id === "ing-1");
      expect(updated?.storageLocation).toBe("fridge");
    });
  });

  describe("remove", () => {
    beforeEach(() => {
      useIngredientStore.setState({ isLoading: false, ingredients: [mockIngredient1, mockIngredient2] });
    });

    it("정상적으로 삭제되어야 한다", () => {
      const { result } = renderHook(() => useIngredientStore());

      act(() => {
        result.current.remove("ing-1");
      });

      expect(ingredientStorage.setIds).toHaveBeenCalledWith(["ing-2"]);
      expect(ingredientStorage.removeIngredient).toHaveBeenCalledWith("ing-1");

      expect(result.current.ingredients).toHaveLength(1);
      expect(result.current.ingredients[0].id).toBe("ing-2");
    });
  });
});
