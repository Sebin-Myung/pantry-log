import { EditIngredientPage } from "@pages/ingredient/ui/EditIngredientPage";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { id } = useLocalSearchParams();
  const ingredientId = Array.isArray(id) ? id[0] : id;

  return <EditIngredientPage id={ingredientId} />;
}
