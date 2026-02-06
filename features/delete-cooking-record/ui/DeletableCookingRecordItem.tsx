import { CookingRecord, RecipeListItem } from "@entities";
import { hasBatchim, ROUTE_FACTORIES } from "@shared";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { IUseDeleteCookingRecord, useDeleteCookingRecord } from "../model/useDeleteCookingRecord";

interface DeletableCookingRecordItemProps extends CookingRecord, IUseDeleteCookingRecord {}

export function DeletableCookingRecordItem({ onDelete, ...props }: DeletableCookingRecordItemProps) {
  const router = useRouter();

  const { onDeleteCookingRecord } = useDeleteCookingRecord({ onDelete });

  const goToEditCookingRecord = () => {
    router.push(ROUTE_FACTORIES.editCookingRecord(props.id));
  };

  const onItemLongPress = () => {
    Alert.alert(
      `"${props.name}"${hasBatchim(props.name) ? "을" : "를"} 삭제하시겠습니까?`,
      "삭제한 요리 기록은 복구할 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: () => onDeleteCookingRecord(props.id) },
      ],
    );
  };

  return <RecipeListItem {...props} onPress={goToEditCookingRecord} onLongPress={onItemLongPress} />;
}
