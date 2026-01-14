import { IngredientListItem, StorageLocation, useIngredientStore } from "@entities";
import { EmptyLayout } from "@widgets";
import { useMemo } from "react";
import { ScrollView } from "react-native";

interface IngredientListPageProps {
  storageLocation?: StorageLocation;
}

export function IngredientListPage({ storageLocation }: IngredientListPageProps) {
  const ingredients = useIngredientStore((state) => state.ingredients);

  const filteredIngredients = useMemo(() => {
    if (!storageLocation) return ingredients;

    return ingredients.filter((i) => i.storageLocation === storageLocation);
  }, [ingredients, storageLocation]);

  return filteredIngredients.length > 0 ? (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}>
      {filteredIngredients.map((item) => (
        <IngredientListItem key={item.id} {...item} />
      ))}
    </ScrollView>
  ) : (
    <EmptyLayout lines={["해당하는 재료가 없습니다.", "+버튼을 눌러 재료를 추가해보세요!"]} />
  );
}
