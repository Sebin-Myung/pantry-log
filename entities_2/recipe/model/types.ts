import { Ingredient } from "../../ingredient/model/types";

export type RecipeIngredient = Pick<Ingredient, "name" | "quantity">;

export interface Recipe {
  id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  name: string;
  ingredients: RecipeIngredient[];
}
