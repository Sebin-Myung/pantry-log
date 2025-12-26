import { Href } from "expo-router";

export type RouteKey = "home" | "tabAll" | "tabFrozen" | "tabFridge" | "tabPantry" | "addIngredient";

export const ROUTES: { [key in RouteKey]: Href } = {
  home: "/",
  tabAll: "/",
  tabFrozen: "/frozen",
  tabFridge: "/fridge",
  tabPantry: "/pantry",
  addIngredient: "/ingredient/add",
};
