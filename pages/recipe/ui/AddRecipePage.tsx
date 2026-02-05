import { KeyboardAvoidingView, Notice } from "@shared";
import { ScrollView, StyleSheet } from "react-native";
import { useAddRecipe } from "../../../features";
import { RecipeForm } from "../../../widgets";

export function AddRecipePage() {
  const { onSubmit } = useAddRecipe();

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <Notice
          lines={["저장한 레시피를 요리 기록에 사용할 경우,", "이름이 일치하고 용량이 적합한 재료들만 반영됩니다."]}
        />
        <RecipeForm onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60, gap: 20 },
});
