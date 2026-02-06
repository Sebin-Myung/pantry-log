import { CookingRecord, RecipeListItem } from "@entities";
import { hasBatchim } from "@shared";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDeleteCookingRecord } from "../model/useDeleteCookingRecord";

export function DeletableCookingRecordItem(props: CookingRecord) {
  const router = useRouter();

  const { onDeleteCookingRecord } = useDeleteCookingRecord();

  const goToEditCookingRecord = () => {
    // router.push(ROUTE_FACTORIES.editCookingRecord(props.id));
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
