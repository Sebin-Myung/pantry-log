import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, DatePicker, IconButton, Label, TextInput, useTheme } from "@shared";
import { StyleSheet, Text, View } from "react-native";
import { getQuantityString } from "../../../entities";
import { RecipeDropdown } from "../../../features";
import { RecipeIngredients } from "../../recipe-ingredients";
import { IUseCookingRecordForm } from "../model/types";
import { useCookingRecordForm } from "../model/useCookingRecordForm";

export function CookingRecordForm(props: IUseCookingRecordForm) {
  const theme = useTheme();

  const {
    name,
    setName,
    cookedAt,
    setCookedAt,
    selectedRecipe,
    onRecipeItemClick,
    ingredients,
    setIngredients,
    unappliedIngredients,
    onUnappliedIngredientDelete,
    isValid,
    isSubmitting,
    onSubmit,
  } = useCookingRecordForm(props);

  return (
    <View style={styles.container}>
      <Label text="이름" required>
        <TextInput value={name} setValue={setName} placeholder="요리의 이름을 입력해주세요." />
      </Label>
      <Label text="만든 날" required>
        <DatePicker date={cookedAt} setDate={setCookedAt} />
      </Label>
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
      <Button disabled={!isValid} isSubmitting={isSubmitting} onPress={onSubmit}>
        <Button.Text>확인</Button.Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
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
