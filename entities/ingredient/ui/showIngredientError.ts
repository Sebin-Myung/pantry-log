import { showErrorAlert, ShowErrorAlertProps } from "@shared";
import { IngredientError, IngredientErrorString } from "../model";

interface ShowIngredientErrorProps extends Omit<ShowErrorAlertProps, "message"> {
  error: IngredientError;
}

export const showIngredientError = ({ error, ...props }: ShowIngredientErrorProps) => {
  showErrorAlert({ message: IngredientErrorString[error.code], ...props });
};
