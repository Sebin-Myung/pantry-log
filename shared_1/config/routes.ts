import { Href } from "expo-router";

type StaticRouteKey =
  | "home"
  | "tabAll"
  | "tabFrozen"
  | "tabFridge"
  | "tabPantry"
  | "addIngredient"
  | "cookingRecord"
  | "addCookingRecord"
  | "recipe"
  | "addRecipe";
type DynamicRouteKey = "editIngredient" | "editRecipe";

export const ROUTES: Record<StaticRouteKey, Href> = {
  home: "/",
  tabAll: "/",
  tabFrozen: "/frozen",
  tabFridge: "/fridge",
  tabPantry: "/pantry",
  addIngredient: "/ingredient/add",

  cookingRecord: "/records/cooking-record",
  addCookingRecord: "/cooking-record/add",
  recipe: "/records/recipe",
  addRecipe: "/recipe/add",
};

export const ROUTE_FACTORIES: Record<DynamicRouteKey, (...args: any[]) => Href> = {
  editIngredient: (id: string) => `/ingredient/edit/${id}`,
  editRecipe: (id: string) => `/recipe/edit/${id}`,
};
