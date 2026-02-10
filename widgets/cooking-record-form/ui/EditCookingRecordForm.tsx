import { Label } from "@shared";
import { RecipeIngredients } from "../../recipe-ingredients";
import { IUseCookingRecordBaseForm } from "../model/types";
import { useEditCookingRecordForm } from "../model/useEditCookingRecordForm";
import { CookingRecordBaseForm } from "./CookingRecordBaseForm";

export function EditCookingRecordForm({
  initialState,
  onSubmit,
}: Pick<IUseCookingRecordBaseForm, "initialState" | "onSubmit">) {
  const { ingredients, setIngredients } = useEditCookingRecordForm({
    initialState: { ingredients: initialState?.ingredients ?? [] },
  });

  return (
    <CookingRecordBaseForm initialState={initialState} ingredients={ingredients} onSubmit={onSubmit}>
      <Label text="사용한 재료" required>
        <RecipeIngredients inputType="dropdown" ingredients={ingredients} setIngredients={setIngredients} />
      </Label>
    </CookingRecordBaseForm>
  );
}
