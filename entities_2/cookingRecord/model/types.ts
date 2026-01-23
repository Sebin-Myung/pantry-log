import { Recipe } from "../../recipe/model/types";

export interface CookingRecord extends Pick<Recipe, "name" | "ingredients"> {
  id: string;
  cookedAt: string; // ISO date string
}
