import { IUseEditIngredient, useEditIngredient } from "@features";
import { KeyboardAvoidingView, Loading } from "@shared";
import { IngredientForm } from "@widgets";
import { ScrollView, StyleSheet } from "react-native";

export function EditIngredientPage(props: IUseEditIngredient) {
  const { initialState, onSubmit } = useEditIngredient(props);

  if (!initialState) return <Loading />;

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <IngredientForm initialState={initialState} onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
