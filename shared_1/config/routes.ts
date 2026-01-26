import { Href } from "expo-router";

type StaticRouteKey =
  | "home"
  | "tabAll"
  | "tabFrozen"
  | "tabFridge"
  | "tabPantry"
  | "addIngredient"
  | "cookingRecord"
  | "recipe"
  | "addRecipe";
type DynamicRouteKey = "editIngredient";

export const ROUTES: Record<StaticRouteKey, Href> = {
  home: "/",
  tabAll: "/",
  tabFrozen: "/frozen",
  tabFridge: "/fridge",
  tabPantry: "/pantry",
  addIngredient: "/ingredient/add",

  cookingRecord: "/cooking-record",
  recipe: "/recipe",
  addRecipe: "/recipe/add",
};

export const ROUTE_FACTORIES: Record<DynamicRouteKey, (...args: any[]) => Href> = {
  editIngredient: (id: string) => `/ingredient/edit/${id}`,
};
