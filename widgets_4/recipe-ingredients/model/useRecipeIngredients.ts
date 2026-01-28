import { QuantityFieldType } from "@features";
import { IUseRecipeIngredients, RecipeIngredientFieldType } from "./types";

export const DEFAULT_RECIPE_INGREDIENT_ROW: RecipeIngredientFieldType = {
  name: "",
  quantity: { amount: "" },
};

export function useRecipeIngredients({ ingredients, setIngredients }: IUseRecipeIngredients) {
  const getRowProps = (index: number) => {
    const row = ingredients[index];

    const setField =
      <K extends keyof RecipeIngredientFieldType>(key: K) =>
      (value: RecipeIngredientFieldType[K]) => {
        setIngredients((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
      };

    const setQuantity = (value?: Partial<QuantityFieldType>) => {
      setIngredients((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, quantity: value !== undefined ? { ...item.quantity, ...value } : value } : item,
        ),
      );
    };

    return { name: row.name, quantity: row.quantity, setName: setField("name"), setQuantity };
  };

  const addRow = () => {
    setIngredients((prev) => [...prev, DEFAULT_RECIPE_INGREDIENT_ROW]);
  };

  const deleteRow = (index: number) => {
    setIngredients((prev) => prev.filter((item, idx) => idx !== index));
  };

  return { ingredients, getRowProps, addRow, deleteRow };
}
