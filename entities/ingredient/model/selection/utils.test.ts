import { LabelValue } from "@shared";
import { Ingredient } from "../types";
import { getIngredientLabelValueFromValue } from "./utils";

describe("ingredient/selection/utils", () => {
  describe("getIngredientLabelValueFromValue", () => {
    it("해당하는 id를 가진 객체를 반환한다", () => {
      const target = { id: "ing-1", name: "돼지고기" } as Ingredient;
      const ingredients: LabelValue<Ingredient>[] = [
        { label: "돼지고기", value: target },
        { label: "양파", value: { id: "ing-2", name: "양파" } as Ingredient },
      ];

      const result = getIngredientLabelValueFromValue(ingredients, { id: "ing-1" } as Ingredient);
      expect(result?.value.id).toBe("ing-1");
      expect(result?.label).toBe("돼지고기");
    });
  });
});
