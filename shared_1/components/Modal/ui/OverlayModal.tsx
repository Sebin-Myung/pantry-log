import { Modal, Pressable } from "react-native";

type BaseModalProps = React.ComponentProps<typeof Modal>;

export function OverlayModal({ onRequestClose, children, ...props }: BaseModalProps) {
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
