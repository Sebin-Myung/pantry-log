import { CookingRecordSubmitItem, isValidQuantity, QuantityFieldType } from "@entities";
import { getDateFormat, ROUTES, useSubmit } from "@shared";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { CookingRecordFormState, IUseCookingRecordBaseForm } from "./types";

interface ValidCookingRecordFormState extends Omit<CookingRecordFormState, "cookedAt" | "ingredients"> {
  cookedAt: Date;
  ingredients: { name: string; quantity: Required<QuantityFieldType> }[];
}

export function useCookingRecordBaseForm({
  initialState,
  ingredients,
  onSubmit: onSubmitItem,
}: IUseCookingRecordBaseForm) {
  const router = useRouter();
  const { isSubmitting, handleSubmit } = useSubmit();

  const [name, setName] = useState<string>("");
  const [cookedAt, setCookedAt] = useState<Date>();

  const isValidState = (state: CookingRecordFormState): state is ValidCookingRecordFormState => {
    return (
      !!state.name &&
      !!state.cookedAt &&
      state.ingredients.every((item) => !!item.name && isValidQuantity(item.quantity))
    );
  };

  const isValid = useMemo(() => isValidState({ name, cookedAt, ingredients }), [name, cookedAt, ingredients]);

  const onSubmit = () =>
    handleSubmit(async () => {
      const state = { name, cookedAt, ingredients };

      if (!isValidState(state)) return;

      const newCookingRecord: CookingRecordSubmitItem = {
        name: state.name,
        cookedAt: getDateFormat(state.cookedAt),
        ingredients: state.ingredients.map((item) => ({
          name: item.name,
          quantity: item.quantity ? { amount: Number(item.quantity.amount), unit: item.quantity.unit.value } : null,
        })),
      };

      try {
        onSubmitItem(newCookingRecord);

        router.replace(`${ROUTES.cookingRecord}?date=${getDateFormat(state.cookedAt)}`);
      } catch (error) {
        throw error;
      }
    });

  useEffect(() => {
    if (!initialState) return;

    if (initialState.name) setName(initialState.name);
    if (initialState.cookedAt) setCookedAt(new Date(initialState.cookedAt));
  }, [initialState]);

  return {
    name,
    setName,
    cookedAt,
    setCookedAt,
    isValid,
    isSubmitting,
    onSubmit,
  };
}
