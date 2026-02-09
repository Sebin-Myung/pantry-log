import { getQuantityUnitLabelValueFromValue, Ingredient, QuantityFieldType } from "@entities";
import { LabelValue } from "@shared";
import { RecipeIngredientFieldType, RecipeIngredientsDropdownProps, UseRecipeIngredientsProps } from "./types";

export const DEFAULT_RECIPE_INGREDIENT_ROW: RecipeIngredientFieldType = {
  name: "",
  quantity: { amount: "" },
};

export function useRecipeIngredients(props: UseRecipeIngredientsProps) {
  const { ingredients, setIngredients } = props;
  const isDropdownType = (props: UseRecipeIngredientsProps): props is RecipeIngredientsDropdownProps =>
    props.inputType === "dropdown";

  const getRowProps = (index: number) => {
    const row = ingredients[index];

    const setField =
      <K extends keyof RecipeIngredientFieldType>(key: K) =>
      (value: RecipeIngredientFieldType[K]) => {
        setIngredients((prev: UseRecipeIngredientsProps["ingredients"]) =>
          prev.map((item, idx) => (idx === index ? { ...item, [key]: value } : item)),
        );
      };

    const setQuantity = (value?: Partial<QuantityFieldType>) => {
      setIngredients((prev: UseRecipeIngredientsProps["ingredients"]) =>
        prev.map((item, idx) => {
          if (idx !== index) return item;
          if (value === undefined) return { ...item, quantity: value };
          return { ...item, quantity: { ...item.quantity, ...value } };
        }),
      );
    };

    if (!isDropdownType(props))
      return { name: row.name, quantity: row.quantity, setName: setField("name"), setQuantity };

    const selectedIngredient = props.ingredients[index].selectedIngredient;
    const existedAmount = selectedIngredient?.value.quantity?.amount;
    const existedUnit = selectedIngredient?.value.quantity?.unit;

    const setSelectedIngredient = (ingredient?: LabelValue<Ingredient>) => {
      props.setIngredients((prev) =>
        prev.map((item, idx) => (idx === index ? { ...item, selectedIngredient: ingredient } : item)),
      );

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
      props.setIngredients((prev) =>
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

  const disabledIngredientIds = !isDropdownType(props)
    ? []
    : props.ingredients.map((item) => item.selectedIngredient?.value.id).filter((id): id is Ingredient["id"] => !!id);

  const addRow = () => {
    setIngredients((prev: UseRecipeIngredientsProps["ingredients"]) => [...prev, DEFAULT_RECIPE_INGREDIENT_ROW]);
  };

  const deleteRow = (index: number) => {
    setIngredients((prev: UseRecipeIngredientsProps["ingredients"]) => prev.filter((_, idx) => idx !== index));
  };

  return { ingredients, getRowProps, disabledIngredientIds, addRow, deleteRow };
}
