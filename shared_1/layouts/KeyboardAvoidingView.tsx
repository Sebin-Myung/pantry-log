import { KeyboardAvoidingView as BaseKeyboardAvoidingView, Platform } from "react-native";

export function KeyboardAvoidingView({ children }: React.PropsWithChildren) {
  return (
    <BaseKeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // header 높이
    >
      {children}
    </BaseKeyboardAvoidingView>
  );
}
