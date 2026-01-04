import { Href } from "expo-router";

export type RouteKey = "home" | "tabAll" | "tabFrozen" | "tabFridge" | "tabPantry" | "addIngredient";

export const ROUTES: Record<RouteKey, Href> = {
  home: "/",
  tabAll: "/",
  tabFrozen: "/frozen",
  tabFridge: "/fridge",
  tabPantry: "/pantry",
  addIngredient: "/ingredient/add",
};
