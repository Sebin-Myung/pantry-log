import {
  CookingRecord,
  CookingRecordError,
  cookingRecordRepository,
  cookingRecordStorage,
  CookingRecordSubmitItem,
  showCookingRecordError,
} from "@entities";
import { useRouterFunc } from "@shared";
import { useEffect, useState } from "react";

export function useEditCookingRecord({ id }: Pick<CookingRecord, "id">) {
  const { goBack } = useRouterFunc();

  const [item, setItem] = useState<CookingRecord>();

  const onSubmit = (item: CookingRecordSubmitItem) => {
    try {
      const updatedAt = new Date().toISOString();
      cookingRecordRepository.updateCookingRecord(id, { updatedAt, ...item });
    } catch (error) {
      if (error instanceof CookingRecordError) {
        showCookingRecordError({ error });
      }
      throw error;
    }
  };

  useEffect(() => {
    const storageCookingRecord = cookingRecordStorage.getCookingRecord(id);

    if (!storageCookingRecord) {
      showCookingRecordError({ error: new CookingRecordError("COOKING_RECORD_NOT_FOUND"), onPress: goBack });
      return;
    }

    setItem(storageCookingRecord);
  }, []);

  return { initialState: item, onSubmit };
}
