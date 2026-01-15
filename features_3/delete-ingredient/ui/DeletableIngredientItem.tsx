import { Ingredient, IngredientListItem } from "@entities";
import { ROUTE_FACTORIES } from "@shared";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDeleteIngredient } from "../model/useDeleteIngredient";

export function DeletableIngredientItem(props: Ingredient) {
  const router = useRouter();
  const { onDeleteIngredient } = useDeleteIngredient();

  const goToEditIngredient = () => {
    router.push(ROUTE_FACTORIES.editIngredient(props.id));
  };

  const onItemLongPress = () => {
    Alert.alert("삭제하시겠습니까?", "이 재료는 복구할 수 없습니다.", [
      { text: "취소", style: "cancel" },
      { text: "삭제", style: "destructive", onPress: () => onDeleteIngredient(props.id) },
    ]);
  };

  return <IngredientListItem {...props} onPress={goToEditIngredient} onLongPress={onItemLongPress} />;
}
