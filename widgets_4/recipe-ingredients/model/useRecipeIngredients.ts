import { Ingredient } from "@entities";
import { getQuantityUnitLabelValueFromValue, QuantityFieldType } from "@features";
import { LabelValue } from "@shared";
import { useMemo, useState } from "react";
import { IUseRecipeIngredients, RecipeIngredientFieldType } from "./types";

export const DEFAULT_RECIPE_INGREDIENT_ROW: RecipeIngredientFieldType = {
  name: "",
  quantity: { amount: "" },
};

export function useRecipeIngredients({ inputType = "input", ingredients, setIngredients }: IUseRecipeIngredients) {
  const [selectedIngredients, setSelectedIngredients] = useState<(LabelValue<Ingredient> | undefined)[]>([]);

  const getRowProps = (index: number) => {
    const row = ingredients[index];

    const setField =
      <K extends keyof RecipeIngredientFieldType>(key: K) =>
      (value: RecipeIngredientFieldType[K]) => {
        setIngredients((prev) => prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)));
      };

    const setQuantity = (value?: Partial<QuantityFieldType>) => {
      setIngredients((prev) =>
        prev.map((item, idx) => {
          if (idx !== index) return item;
          if (value === undefined) return { ...item, quantity: value };
          return { ...item, quantity: { ...item.quantity, ...value } };
        }),
      );
    };

    if (inputType === "input")
      return { name: row.name, quantity: row.quantity, setName: setField("name"), setQuantity };

    const selectedIngredient = selectedIngredients[index];
    const existedAmount = selectedIngredient?.value.quantity?.amount;
    const existedUnit = selectedIngredient?.value.quantity?.unit;

    const setSelectedIngredient = (ingredient?: LabelValue<Ingredient>) => {
      setSelectedIngredients((prev) => {
        const newIngredients = [...prev];
        newIngredients[index] = ingredient;
        return newIngredients;
      });

      setField("name")(ingredient?.label ?? "");

      const newExistedUnit = ingredient?.value.quantity?.unit;
      if (row.quantity !== undefined) {
        setQuantity({
          amount: "",
          unit: newExistedUnit ? getQuantityUnitLabelValueFromValue(newExistedUnit) : undefined,
        });
      }
    };

    const setRestrictedQuantity = (value?: Partial<QuantityFieldType>) => {
      setIngredients((prev) =>
        prev.map((item, idx) => {
          if (idx !== index) return item;
          if (value === undefined) return { ...item, quantity: value };

          let quantity = { ...item.quantity, ...value };

          if (existedAmount) quantity.amount = Math.min(Number(quantity.amount), existedAmount).toString();
          if (existedUnit) quantity.unit = getQuantityUnitLabelValueFromValue(existedUnit);

          return { ...item, quantity };
        }),
      );
    };

    return {
      selectedIngredient,
      setSelectedIngredient,
      quantity: row.quantity,
      setQuantity: setRestrictedQuantity,
      unitDisabled: !!existedUnit,
    };
  };

  const disabledIngredientIds = useMemo(
    () => selectedIngredients.map((item) => item?.value.id).filter((id): id is Ingredient["id"] => !!id),
    [selectedIngredients],
  );

  const addRow = () => {
    setIngredients((prev) => [...prev, DEFAULT_RECIPE_INGREDIENT_ROW]);
  };

  const deleteRow = (index: number) => {
    setIngredients((prev) => prev.filter((item, idx) => idx !== index));
  };

  return { ingredients, getRowProps, disabledIngredientIds, addRow, deleteRow };
}
