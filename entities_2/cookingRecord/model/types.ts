import { Recipe } from "../../recipe/model/types";

export interface CookingRecord extends Pick<Recipe, "name" | "ingredients"> {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  cookedAt: string; // YYYY-MM-DD
}
