import { Alert } from "react-native";

export interface ShowErrorAlertProps {
  title?: string;
  message: string;
  onPress?: VoidFunction;
}

export const showErrorAlert = ({ title = "알림", message, onPress }: ShowErrorAlertProps) => {
  Alert.alert(title, message, [{ text: "확인", style: "default", onPress }]);
};
