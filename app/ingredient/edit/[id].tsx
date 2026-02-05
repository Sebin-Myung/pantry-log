import { useLocalSearchParams } from "expo-router";
import { EditIngredientPage } from "../../../pages";

export default function Page() {
  const { id } = useLocalSearchParams();
  const ingredientId = Array.isArray(id) ? id[0] : id;

  return <EditIngredientPage id={ingredientId} />;
}
