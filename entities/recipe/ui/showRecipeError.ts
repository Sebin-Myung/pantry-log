import { showErrorAlert, ShowErrorAlertProps } from "@shared";
import { RecipeError, RecipeErrorString } from "../model";

interface ShowRecipeErrorProps extends Omit<ShowErrorAlertProps, "message"> {
  error: RecipeError;
}

export const showRecipeError = ({ error, ...props }: ShowRecipeErrorProps) => {
  showErrorAlert({ message: RecipeErrorString[error.code], ...props });
};
