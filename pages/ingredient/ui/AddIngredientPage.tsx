import { useAddIngredient } from "@features";
import { KeyboardAvoidingView } from "@shared";
import { IngredientForm } from "@widgets";
import { ScrollView, StyleSheet } from "react-native";

export function AddIngredientPage() {
  const { onSubmit } = useAddIngredient();

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <IngredientForm onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
