import { EditCookingRecordPage } from "@pages";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
  const { id } = useLocalSearchParams();
  const cookingRecordId = Array.isArray(id) ? id[0] : id;

  return <EditCookingRecordPage id={cookingRecordId} />;
}
