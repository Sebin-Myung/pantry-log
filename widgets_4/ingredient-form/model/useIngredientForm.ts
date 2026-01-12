import { useIngredientStore } from "@entities";
import { ROUTES } from "@shared";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { IngredientFormState, IUseIngredientForm } from "./type";

interface ValidIngredientFormState
  extends Omit<IngredientFormState, "location" | "quantity" | "purchaseDate">,
    Required<Pick<IngredientFormState, "location" | "purchaseDate">> {
  quantity?: Required<IngredientFormState["quantity"]>;
}

export function useIngredientForm({ state, setState }: IUseIngredientForm) {
  const router = useRouter();
  const addIngredient = useIngredientStore((state) => state.add);

  const setField =
    <K extends keyof IngredientFormState>(key: K) =>
    (value: IngredientFormState[K]) => {
      setState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

  const isValidState = (state: IUseIngredientForm["state"]): state is ValidIngredientFormState => {
    return (
      !!state.location &&
      !!state.name &&
      !!state.purchaseDate &&
      (!state.quantity || (Number(state.quantity.amount ?? "0") > 0 && !!state.quantity.unit))
    );
  };

  const isValid = useMemo(() => isValidState(state), [state, isValidState]);

  const onSubmit = () => {
    if (!isValidState(state)) return;

    try {
      addIngredient({
        id: new Date().getTime().toString(),
        name: state.name,
        storageLocation: state.location.value,
        brand: state.brand,
        purchaseSource: state.purchaseSource,
        quantity: state.quantity ? { amount: Number(state.quantity.amount), unit: state.quantity.unit.value } : null,
        purchaseDate: state.purchaseDate?.toISOString(),
        productionDate: state.productionDate?.toISOString() ?? null,
        expirationDate: state.expirationDate?.toISOString() ?? null,
        imageUrl: null,
      });

      router.replace(ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };

  return { state, setField, isValid, onSubmit };
}
