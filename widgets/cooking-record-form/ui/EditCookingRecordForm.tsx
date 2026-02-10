import { CookingRecordSubmitItem } from "@entities";
import { Label } from "@shared";
import { RecipeIngredients } from "../../recipe-ingredients";
import { IUseCookingRecordBaseForm } from "../model/types";
import { useEditCookingRecordForm } from "../model/useEditCookingRecordForm";
import { CookingRecordBaseForm } from "./CookingRecordBaseForm";

interface EditCookingRecordFormProps {
  initialState: CookingRecordSubmitItem;
  onSubmit: IUseCookingRecordBaseForm["onSubmit"];
}

export function EditCookingRecordForm({ initialState, onSubmit }: EditCookingRecordFormProps) {
  const { ingredients, setIngredients } = useEditCookingRecordForm({
    initialState,
  });

  return (
    <CookingRecordBaseForm initialState={initialState} ingredients={ingredients} onSubmit={onSubmit}>
      <Label text="사용한 재료" required>
        <RecipeIngredients inputType="input" ingredients={ingredients} setIngredients={setIngredients} />
      </Label>
    </CookingRecordBaseForm>
  );
}
