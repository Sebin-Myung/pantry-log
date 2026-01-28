import { IngredientSubmitItem } from "@entities";
import { getQuantityUnitLabelValueFromValue, getStorageLocationLabelValueFromValue, isValidQuantity } from "@features";
import { ROUTES } from "@shared";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { IngredientFormState, IUseIngredientForm } from "./type";

interface ValidIngredientFormState
  extends
    Omit<IngredientFormState, "location" | "quantity" | "purchaseDate">,
    Required<Pick<IngredientFormState, "location" | "purchaseDate">> {
  quantity?: Required<IngredientFormState["quantity"]>;
}

export function useIngredientForm({ initialState, onSubmit: onSubmitItem }: IUseIngredientForm) {
  const router = useRouter();

  const [formState, setFormState] = useState<IngredientFormState>({
    name: "",
    brand: "",
    purchaseSource: "",
    purchaseDate: new Date(),
    quantity: { amount: "" },
  });

  const setField =
    <K extends keyof IngredientFormState>(key: K) =>
    (value: IngredientFormState[K]) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

  const isValidState = (state: IngredientFormState): state is ValidIngredientFormState => {
    return !!state.location && !!state.name && !!state.purchaseDate && isValidQuantity(state.quantity);
  };

  const isValid = useMemo(() => isValidState(formState), [formState, isValidState]);

  const onSubmit = () => {
    if (!isValidState(formState)) return;

    const newIngredient: IngredientSubmitItem = {
      name: formState.name,
      storageLocation: formState.location.value,
      brand: formState.brand,
      purchaseSource: formState.purchaseSource,
      quantity: formState.quantity
        ? { amount: Number(formState.quantity.amount), unit: formState.quantity.unit.value }
        : null,
      purchaseDate: formState.purchaseDate?.toISOString(),
      productionDate: formState.productionDate?.toISOString() ?? null,
      expirationDate: formState.expirationDate?.toISOString() ?? null,
      imageUrl: null,
    };

    try {
      onSubmitItem(newIngredient);

      router.replace(ROUTES.home);
    } catch (error) {}
  };

  useEffect(() => {
    if (!initialState) return;

    const existedState: Partial<IngredientFormState> = {
      name: initialState.name,
      purchaseDate: new Date(initialState.purchaseDate),
      location: getStorageLocationLabelValueFromValue(initialState.storageLocation),
    };
    if (initialState.brand) existedState.brand = initialState.brand;
    if (initialState.purchaseSource) existedState.purchaseSource = initialState.purchaseSource;
    if (initialState.productionDate) existedState.productionDate = new Date(initialState.productionDate);
    if (initialState.expirationDate) existedState.expirationDate = new Date(initialState.expirationDate);
    if (initialState.quantity)
      existedState.quantity = {
        amount: initialState.quantity.amount.toString(),
        unit: getQuantityUnitLabelValueFromValue(initialState.quantity.unit),
      };

    setFormState((prev) => ({ ...prev, ...existedState }));
  }, [initialState]);

  return { state: formState, setField, isValid, onSubmit };
}
