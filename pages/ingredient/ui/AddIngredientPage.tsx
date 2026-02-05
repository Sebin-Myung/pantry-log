import { KeyboardAvoidingView } from "@shared";
import { ScrollView, StyleSheet } from "react-native";
import { useAddIngredient } from "../../../features";
import { IngredientForm } from "../../../widgets";

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
