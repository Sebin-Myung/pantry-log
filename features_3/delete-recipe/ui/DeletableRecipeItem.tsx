import { Recipe, RecipeListItem } from "@entities";
import { hasBatchim } from "@shared";
import { Alert } from "react-native";
import { useDeleteRecipe } from "../model/useDeleteRecipe";

export function DeletableRecipeItem(props: Recipe) {
  const { onDeleteRecipe } = useDeleteRecipe();

  const goToEditRecipe = () => {
    // 라우터 푸시
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
