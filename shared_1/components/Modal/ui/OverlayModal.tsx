import { Modal, Pressable, ScrollView, StyleProp, View, ViewStyle } from "react-native";

type BaseModalProps = React.ComponentProps<typeof Modal>;

function OverlayModal({ onRequestClose, children, ...props }: BaseModalProps) {
  return (
    <Modal transparent animationType="fade" onRequestClose={onRequestClose} {...props}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
        onPress={onRequestClose}
      />
      {children}
    </Modal>
  );
}

function OverlayModalContainer({
  mode = "view",
  style,
  children,
}: React.PropsWithChildren<{ mode?: "scroll" | "view"; style?: StyleProp<ViewStyle> }>) {
  const Component = mode === "view" ? View : ScrollView;

  return (
    <Component
      style={[
        {
          position: "absolute",
          maxHeight: "80%",
          left: 20,
          right: 20,
          top: "50%",
          transform: [{ translateY: "-50%" }],
          backgroundColor: "#fff",
          borderRadius: 10,
          overflow: "hidden",

          // iOS shadow
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },

          // Android shadow
          elevation: 6,
        },
        style,
      ]}>
      {children}
    </Component>
  );
}

OverlayModal.Container = OverlayModalContainer;
export { OverlayModal };
