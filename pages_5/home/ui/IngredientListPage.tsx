import { IngredientListItem, StorageLocation, useIngredientStore } from "@entities";
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

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}>
      {filteredIngredients.map((item) => (
        <IngredientListItem key={item.id} {...item} />
      ))}
    </ScrollView>
  );
}
