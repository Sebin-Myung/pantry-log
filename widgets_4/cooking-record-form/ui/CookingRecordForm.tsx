import { RecipeDropdown } from "@features";
import { Button, DatePicker, Label, TextInput } from "@shared";
import { StyleSheet, View } from "react-native";
import { RecipeIngredients } from "../../recipe-ingredients";
import { IUseCookingRecordForm } from "../model/types";
import { useCookingRecordForm } from "../model/useCookingRecordForm";

export function CookingRecordForm(props: IUseCookingRecordForm) {
  const {
    name,
    setName,
    cookedAt,
    setCookedAt,
    selectedRecipe,
    onRecipeItemClick,
    ingredients,
    setIngredients,
    unappliedIngredients,
    setUnappliedIngredients,
    isValid,
    isSubmitting,
    onSubmit,
  } = useCookingRecordForm(props);

  return (
    <View style={styles.container}>
      <Label text="이름" required>
        <TextInput value={name} setValue={setName} placeholder="요리의 이름을 입력해주세요." />
      </Label>
      <Label text="만든 날" required>
        <DatePicker date={cookedAt} setDate={setCookedAt} />
      </Label>
      <Label text="레시피 불러오기">
        <RecipeDropdown selectedRecipe={selectedRecipe} setSelectedRecipe={onRecipeItemClick} />
      </Label>
      <Label text="사용한 재료" required>
        {/** 불러온 레시피 중 반영되지 않은 재료들 */}

        <RecipeIngredients inputType="dropdown" ingredients={ingredients} setIngredients={setIngredients} />
      </Label>
      <Button disabled={!isValid} isSubmitting={isSubmitting} onPress={onSubmit}>
        <Button.Text>확인</Button.Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
});
