import { getQuantityString, RecipeDropdown } from "@entities";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IconButton, Label, useTheme } from "@shared";
import { StyleSheet, Text, View } from "react-native";
import { RecipeIngredients } from "../../recipe-ingredients";
import { IUseCookingRecordBaseForm } from "../model/types";
import { useAddCookingRecordForm } from "../model/useAddCookingRecordForm";
import { CookingRecordBaseForm } from "./CookingRecordBaseForm";

export function AddCookingRecordForm({ initialState }: Pick<IUseCookingRecordBaseForm, "initialState">) {
  const theme = useTheme();

  const {
    selectedRecipe,
    onRecipeItemClick,
    ingredients,
    setIngredients,
    unappliedIngredients,
    onUnappliedIngredientDelete,
    onSubmit,
  } = useAddCookingRecordForm();

  return (
    <CookingRecordBaseForm initialState={initialState} ingredients={ingredients} onSubmit={onSubmit}>
      <Label text="레시피 불러오기">
        <RecipeDropdown selectedRecipe={selectedRecipe} setSelectedRecipe={onRecipeItemClick} />
      </Label>
      <Label text="사용한 재료" required>
        {unappliedIngredients.length > 0 && (
          <View style={styles.unapplidedIngredientsContainer}>
            {unappliedIngredients.map((item, index) => (
              <View key={index} style={{ ...styles.unappliedIngredientItem, borderColor: theme.colors.accent }}>
                <View style={styles.unappliedIngredientTitle}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.unappliedIngredientName}>
                    {item.name}
                  </Text>
                  {item.quantity && (
                    <Text style={{ flexShrink: 0, color: theme.colors.textSecondary }}>
                      {getQuantityString(item.quantity)}
                    </Text>
                  )}
                </View>

                <IconButton onPress={() => onUnappliedIngredientDelete(index)}>
                  <FontAwesome name="remove" size={20} color={theme.colors.accentDark} />
                </IconButton>
              </View>
            ))}
          </View>
        )}

        <RecipeIngredients inputType="dropdown" ingredients={ingredients} setIngredients={setIngredients} />
      </Label>
    </CookingRecordBaseForm>
  );
}

const styles = StyleSheet.create({
  unapplidedIngredientsContainer: { marginBottom: 12, gap: 4 },
  unappliedIngredientItem: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  unappliedIngredientTitle: { flexDirection: "row", gap: 8, alignItems: "center", flexShrink: 1 },
  unappliedIngredientName: { flexShrink: 1, flexGrow: 0, minWidth: 0 },
});
