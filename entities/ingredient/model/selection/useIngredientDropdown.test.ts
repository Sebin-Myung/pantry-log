import { act, renderHook } from "@testing-library/react-native";
import { useIngredientStore } from "../store";
import { Ingredient } from "../types";
import { useIngredientDropdown } from "./useIngredientDropdown";

jest.mock("../store", () => ({
  useIngredientStore: jest.fn(),
}));

describe("useIngredientDropdown", () => {
  const hydrateMock = jest.fn();
  const mockIngredients = [
    { id: "ing-1", name: "돼지고기" },
    { id: "ing-2", name: "양파" },
  ] as Ingredient[];

  beforeEach(() => {
    jest.clearAllMocks();
    (useIngredientStore as unknown as jest.Mock).mockImplementation((selector) => {
      const state = {
        isLoading: false,
        hydrate: hydrateMock,
        ingredients: mockIngredients,
      };
      return selector(state);
    });
  });

  it("마운트 시점(useEffect)에 hydrate를 호출한다", () => {
    renderHook(() => useIngredientDropdown({ setSelectedIngredient: jest.fn() }));
    expect(hydrateMock).toHaveBeenCalledTimes(1);
  });

  it("스토어의 ingredient 데이터에 기반하여 ingredientLabelValues를 반환한다", () => {
    const { result } = renderHook(() => useIngredientDropdown({ setSelectedIngredient: jest.fn() }));

    expect(result.current.ingredientLabelValues).toHaveLength(2);
    expect(result.current.ingredientLabelValues[0].label).toBe("돼지고기");
    expect(result.current.ingredientLabelValues[0].value.id).toBe("ing-1");
  });

  describe("onIngredientChange", () => {
    it("선택된 ingredient 객체를 받고, 해당 객체의 LabelValue를 찾아 setSelectedIngredient를 호출한다", () => {
      const setSelectedIngredient = jest.fn();
      const { result } = renderHook(() => useIngredientDropdown({ setSelectedIngredient }));

      act(() => {
        result.current.onIngredientChange({ id: "ing-2" } as Ingredient);
      });

      expect(setSelectedIngredient).toHaveBeenCalledWith({
        label: "양파",
        value: mockIngredients[1],
      });
    });

    it("일치하는 값이 없으면 setSelectedIngredient를 호출하지 않는다", () => {
      const setSelectedIngredient = jest.fn();
      const { result } = renderHook(() => useIngredientDropdown({ setSelectedIngredient }));

      act(() => {
        result.current.onIngredientChange({ id: "ing-not-exist" } as Ingredient);
      });

      expect(setSelectedIngredient).not.toHaveBeenCalled();
    });
  });
});
