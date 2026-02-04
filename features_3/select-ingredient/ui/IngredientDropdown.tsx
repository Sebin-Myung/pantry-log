import { Dropdown } from "@shared";
import { IUseIngredientDropdown, useIngredientDropdown } from "../model/useIngredientDropdown";

export function IngredientDropdown(props: IUseIngredientDropdown) {
  const { isLoading, ingredientLabelValues, selectedIngredient, onIngredientChange } = useIngredientDropdown(props);

  const isEmpty = !isLoading && ingredientLabelValues.length === 0;

  return (
    <Dropdown.Root
      placeholder={isEmpty ? "등록한 재료가 없습니다." : "재료를 선택하세요."}
      label={selectedIngredient?.label}
      value={selectedIngredient?.value}
      onValueChange={onIngredientChange}
      disabled={isEmpty}>
      {ingredientLabelValues.map((item, index) => (
        <Dropdown.Item
          key={item.value.id}
          label={item.label}
          value={item.value}
          isLast={index === ingredientLabelValues.length - 1}
        />
      ))}
    </Dropdown.Root>
  );
}
