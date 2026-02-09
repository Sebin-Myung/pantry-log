import { IUseEditRecipe, useEditRecipe } from "@features";
import { KeyboardAvoidingView, Loading } from "@shared";
import { RecipeForm } from "@widgets";
import { ScrollView, StyleSheet } from "react-native";

export function EditRecipePage(props: IUseEditRecipe) {
  const { initialState, onSubmit } = useEditRecipe(props);

  if (!initialState) return <Loading />;

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <RecipeForm initialState={initialState} onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
