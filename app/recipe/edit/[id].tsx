import { useLocalSearchParams } from "expo-router";
import { EditRecipePage } from "../../../pages";

export default function Page() {
  const { id } = useLocalSearchParams();
  const recipeId = Array.isArray(id) ? id[0] : id;

  return <EditRecipePage id={recipeId} />;
}
