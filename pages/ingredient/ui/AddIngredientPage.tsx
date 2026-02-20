import { StorageLocation } from "@entities";
import { useAddIngredient } from "@features";
import { KeyboardAvoidingView } from "@shared";
import { IngredientForm } from "@widgets";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export function AddIngredientPage() {
  const { location } = useLocalSearchParams<{ location?: StorageLocation }>();

  const { onSubmit } = useAddIngredient();

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <IngredientForm initialState={location ? { storageLocation: location } : undefined} onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
