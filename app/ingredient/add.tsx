import { IngredientForm, IngredientFormState } from "@widgets";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";

export default function AddIngredientPage() {
  const [formState, setFormState] = useState<IngredientFormState>({
    name: "",
    brand: "",
    purchaseSource: "",
    purchaseDate: new Date(),
    quantity: { amount: "" },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // header 높이
    >
      <ScrollView contentContainerStyle={styles.container}>
        <IngredientForm state={formState} setState={setFormState} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
