import Entypo from "@expo/vector-icons/Entypo";
import { BasePressableProps, useTheme } from "@shared";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getQuantityString } from "../../ingredient";
import { Recipe } from "../model";

interface RecipeListItemProps
  extends Omit<Recipe, "createdAt" | "updatedAt">, Pick<BasePressableProps, "onPress" | "onLongPress"> {}

export function RecipeListItem({ id, name, ingredients, onPress, onLongPress }: RecipeListItemProps) {
  const theme = useTheme();

  return (
    <Pressable style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Text style={styles.title}>{name}</Text>

      <View style={{ ...styles.divider, backgroundColor: theme.colors.gray }} />

      <View style={styles.ingredients}>
        {ingredients.map((item, index) => (
          <View key={`${id}-${index}`} style={styles.ingredient}>
            <Entypo name="dot-single" size={24} color="black" />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.ingredientName}>
              {item.name}
            </Text>
            {item.quantity && (
              <Text style={{ flexShrink: 0, color: theme.colors.textSecondary }}>
                {getQuantityString(item.quantity)}
              </Text>
            )}
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  },
  title: { fontSize: 16, fontWeight: "600", padding: 4, paddingBottom: 0 },
  ingredients: { gap: 4 },
  ingredient: { flexDirection: "row", alignItems: "center" },
  ingredientName: { flexShrink: 1, flexGrow: 0, minWidth: 0, marginRight: 8 },
  divider: { width: "100%", height: 1 },
});
