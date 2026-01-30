import { useRecipeStore } from "@entities";
import { DeletableRecipeItem } from "@features";
import { Loading } from "@shared";
import { EmptyLayout } from "@widgets";
import { useEffect } from "react";
import { ScrollView } from "react-native";

export function RecipeListPage() {
  const isLoading = useRecipeStore((state) => state.isLoading);
  const hydrate = useRecipeStore((state) => state.hydrate);
  const recipes = useRecipeStore((state) => state.recipes);

  useEffect(() => {
    hydrate();
  }, []);

  if (isLoading) return <Loading />;

  return recipes.length > 0 ? (
    <ScrollView
      contentContainerStyle={{
        padding: 10,
        gap: 10,
      }}>
      {recipes.map((item) => (
        <DeletableRecipeItem key={item.id} {...item} />
      ))}
    </ScrollView>
  ) : (
    <EmptyLayout lines={["해당하는 레시피가 없습니다.", "+버튼을 눌러 레시피를 추가해보세요!"]} />
  );
}
