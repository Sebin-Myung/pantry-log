import { Button, Label, TextInput } from "@shared";
import { StyleSheet, View } from "react-native";
import { RecipeIngredients } from "../../recipe-ingredients/ui/RecipeIngredients";
import { IUseRecipeForm } from "../model/types";
import { useRecipeForm } from "../model/useRecipeForm";

export function RecipeForm(props: IUseRecipeForm) {
  const { name, setName, ingredients, setIngredients, isValid, isSubmitting, onSubmit } = useRecipeForm(props);

  return (
    <View style={styles.container}>
      <Label text="이름" required>
        <TextInput value={name} setValue={setName} placeholder="레시피의 이름을 입력해주세요." />
      </Label>
      <Label text="사용한 재료" required>
        <RecipeIngredients inputType="input" ingredients={ingredients} setIngredients={setIngredients} />
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
