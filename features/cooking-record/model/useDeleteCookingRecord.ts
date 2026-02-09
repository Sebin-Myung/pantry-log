import { CookingRecord, cookingRecordRepository } from "@entities";

export interface IUseDeleteCookingRecord {
  onDelete?: VoidFunction;
}

export function useDeleteCookingRecord({ onDelete }: IUseDeleteCookingRecord) {
  const onDeleteCookingRecord = (id: CookingRecord["id"]) => {
    cookingRecordRepository.removeCookingRecord(id);
    onDelete?.();
  };

  return { onDeleteCookingRecord };
}
