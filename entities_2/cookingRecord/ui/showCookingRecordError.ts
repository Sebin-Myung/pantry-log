import { showErrorAlert, ShowErrorAlertProps } from "@shared";
import { CookingRecordError, CookingRecordErrorString } from "../model";

interface ShowCookingRecordErrorProps extends Omit<ShowErrorAlertProps, "message"> {
  error: CookingRecordError;
}

export const showCookingRecordError = ({ error, ...props }: ShowCookingRecordErrorProps) => {
  showErrorAlert({ message: CookingRecordErrorString[error.code], ...props });
};
