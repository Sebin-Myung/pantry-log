import { Recipe } from "./types";
import { getRecipeKeys, sortRecipes } from "./utils";

describe("recipe/model/utils", () => {
  describe("sortRecipes", () => {
    const itemA = { name: "가" } as Recipe;
    const itemB = { name: "나" } as Recipe;

    it("이름 가나다 순으로 정렬한다", () => {
      const result = sortRecipes([itemB, itemA]);
      expect(result[0].name).toBe("가");
      expect(result[1].name).toBe("나");
    });
  });

  describe("getRecipeKeys", () => {
    it("배열에서 id만 추출한다", () => {
      const items = [{ id: "recipe-1" }, { id: "recipe-2" }] as Recipe[];
      expect(getRecipeKeys(items)).toEqual(["recipe-1", "recipe-2"]);
    });
  });
});
