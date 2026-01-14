import { useAddIngredient } from "@features";
import { IngredientForm } from "@widgets";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export function AddIngredientPage() {
  const { onSubmit } = useAddIngredient();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // header 높이
    >
      <ScrollView contentContainerStyle={styles.container}>
        <IngredientForm onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
