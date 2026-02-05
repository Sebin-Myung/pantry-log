import { Dropdown } from "@shared";
import { IUseRecipeDropdown, useRecipeDropdown } from "../model/useRecipeDropdown";

export function RecipeDropdown(props: IUseRecipeDropdown) {
  const { isLoading, recipeLabelValues, selectedRecipe, onRecipeChange } = useRecipeDropdown(props);

  const isEmpty = !isLoading && recipeLabelValues.length === 0;

  return (
    <Dropdown.Root
      placeholder={isEmpty ? "등록한 레시피가 없습니다." : "레시피를 선택하세요."}
      label={selectedRecipe?.label}
      value={selectedRecipe?.value}
      onValueChange={onRecipeChange}
      disabled={isEmpty}>
      {recipeLabelValues.map((item, index) => (
        <Dropdown.Item
          key={item.value.id}
          label={item.label}
          value={item.value}
          isLast={index === recipeLabelValues.length - 1}
        />
      ))}
    </Dropdown.Root>
  );
}
