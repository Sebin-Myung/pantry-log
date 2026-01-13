import { compareDateAsc } from "@shared";
import { QuantityUnitKorean } from "./constants";
import { Ingredient, Quantity } from "./types";

export const sortIngredients = (items: Ingredient[]) => {
  return [...items].sort((a, b) => {
    // 1. 소비기한 빠른 순
    const exp = compareDateAsc(a.expirationDate, b.expirationDate);
    if (exp !== 0) return exp;

    // 2. 제조일자 빠른 순
    const prod = compareDateAsc(a.productionDate, b.productionDate);
    if (prod !== 0) return prod;

    // 3. 구매일자 빠른 순
    const purchase = compareDateAsc(a.purchaseDate, b.purchaseDate);
    if (purchase !== 0) return purchase;

    // 4. 이름 가나다 순
    return a.name.localeCompare(b.name, "ko");
  });
};

export const getIngredientKeys = (items: Ingredient[]) => {
  return items.map((item) => item.id);
};

export const getQuantityString = (quantity: Quantity) => {
  const { amount, unit } = quantity;
  if (amount > 1000) return `${amount / 1000}k${QuantityUnitKorean[unit]}`;
  return `${amount}${QuantityUnitKorean[unit]}`;
};
