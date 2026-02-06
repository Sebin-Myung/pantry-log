import { CookingRecord, cookingRecordRepository } from "@entities";

export function useDeleteCookingRecord() {
  const onDeleteCookingRecord = (id: CookingRecord["id"]) => {
    cookingRecordRepository.removeCookingRecord(id);
  };

  return { onDeleteCookingRecord };
}
