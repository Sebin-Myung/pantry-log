import { LabelValue } from "@shared";
import { Recipe } from "../types";
import { getRecipeLabelValueFromValue } from "./utils";

describe("recipe/selection/utils", () => {
  describe("getRecipeLabelValueFromValue", () => {
    it("해당하는 id를 가진 객체를 반환한다", () => {
      const targetRecipe = { id: "recipe-1", name: "김치찌개" } as Recipe;
      const recipes: LabelValue<Recipe>[] = [
        { label: "김치찌개", value: targetRecipe },
        { label: "된장찌개", value: { id: "recipe-2", name: "된장찌개" } as Recipe },
      ];

      const result = getRecipeLabelValueFromValue(recipes, { id: "recipe-1" } as Recipe);
      expect(result?.value.id).toBe("recipe-1");
      expect(result?.label).toBe("김치찌개");
    });
  });
});
