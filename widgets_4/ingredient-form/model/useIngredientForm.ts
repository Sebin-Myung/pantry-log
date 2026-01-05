import { useMemo } from "react";
import { IngredientFormState, IUseIngredientForm } from "./type";

export function useIngredientForm({ state, setState }: IUseIngredientForm) {
  const setField =
    <K extends keyof IngredientFormState>(key: K) =>
    (value: IngredientFormState[K]) => {
      setState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

  const isValid = useMemo(() => {
    return (
      !!state.location &&
      !!state.name &&
      !!state.purchaseDate &&
      (!state.quantity || (Number(state.quantity.amount ?? "0") > 0 && !!state.quantity.unit))
    );
  }, [state]);

  return { state, setField, isValid };
}
