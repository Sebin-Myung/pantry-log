import { Recipe } from "../../recipe/model/types";

export interface CookingRecord extends Pick<Recipe, "name" | "ingredients"> {
  id: string;
  cookedAt: string; // YYYY-MM-DD
}
