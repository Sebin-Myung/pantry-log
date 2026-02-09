import { Recipe, RecipeListItem } from "@entities";
import { hasBatchim, ROUTE_FACTORIES } from "@shared";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDeleteRecipe } from "../../recipe/model/useDeleteRecipe";

export function DeletableRecipeItem(props: Recipe) {
  const router = useRouter();

  const { onDeleteRecipe } = useDeleteRecipe();

  const goToEditRecipe = () => {
    router.push(ROUTE_FACTORIES.editRecipe(props.id));
  };

  const onItemLongPress = () => {
    Alert.alert(
      `"${props.name}"${hasBatchim(props.name) ? "을" : "를"} 삭제하시겠습니까?`,
      "삭제한 레시피는 복구할 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: () => onDeleteRecipe(props.id) },
      ],
    );
  };

  return <RecipeListItem {...props} onPress={goToEditRecipe} onLongPress={onItemLongPress} />;
}
