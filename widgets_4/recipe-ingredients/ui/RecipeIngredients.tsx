import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { QuantityField } from "@features";
import { Button, IconButton, Label, TextInput, useTheme } from "@shared";
import { View } from "react-native";
import { IUseRecipeIngredients } from "../model/types";
import { useRecipeIngredients } from "../model/useRecipeIngredients";

export function RecipeIngredients(props: IUseRecipeIngredients) {
  const theme = useTheme();

  const { ingredients, getRowProps, addRow, deleteRow } = useRecipeIngredients(props);

  return (
    <View style={{ gap: 10 }}>
      {ingredients.map((_, index) => {
        const { name, quantity, setName, setQuantity } = getRowProps(index);

        return (
          <View
            key={`recipe-ingredient-${index}`}
            style={{
              position: "relative",
              borderRadius: 10,
              borderColor: theme.colors.gray,
              borderWidth: 1,
              padding: 10,
              gap: 10,
            }}>
            {ingredients.length > 1 && (
              <IconButton
                style={{
                  position: "absolute",
                  right: -10,
                  top: -10,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 28,
                  height: 28,
                }}
                onPress={() => deleteRow(index)}>
                <View style={{ borderRadius: "100%", backgroundColor: "white", width: 20, height: 20 }} />
                <MaterialIcons
                  name="cancel"
                  size={28}
                  color={theme.colors.accentDark}
                  style={{ position: "absolute" }}
                />
              </IconButton>
            )}
            <Label text="재료 이름" required>
              <TextInput value={name} setValue={setName} placeholder="재료의 이름을 입력해주세요." />
            </Label>
            <Label text="재료 용량" required>
              <QuantityField value={quantity} setValue={setQuantity} />
            </Label>
          </View>
        );
      })}
      <Button variant="secondary" onPress={addRow}>
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </Button>
    </View>
  );
}
