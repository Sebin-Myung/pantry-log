import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../providers/AppThemeProvider";
import { OverlayModal } from "../../Modal/ui/OverlayModal";
import { IUseDatePicker, useDatePicker } from "../model/useDatePicker";

export function DatePicker({ placeholder = "날짜 선택", ...props }: IUseDatePicker & { placeholder?: string }) {
  const { date, tempDate, isOpen, openModal, cancelModal, confirmModal, onDateChange } = useDatePicker(props);
  const theme = useTheme();

  return (
    <View>
      <Pressable
        onPress={openModal}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        style={{ ...styles.trigger, borderColor: theme.colors.gray }}>
        <Text style={{ ...styles.label, ...(!date ? { color: theme.colors.gray } : {}) }}>
          {date ? date.toLocaleDateString("ko-KR") : placeholder}
        </Text>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={24}
          color={theme.colors.darkGray}
          style={styles.icon}
        />
      </Pressable>
      {isOpen && (
        <OverlayModal visible={isOpen} onRequestClose={cancelModal}>
          <OverlayModal.Container style={styles.modalContainer}>
            <DateTimePicker value={tempDate} mode="date" display="spinner" locale="ko-KR" onChange={onDateChange} />
            <View style={styles.actions}>
              <Pressable style={styles.modalButton} onPress={cancelModal}>
                <Text style={{ ...styles.modelButtonText, color: theme.colors.accentDark }}>취소</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={confirmModal}>
                <Text style={{ ...styles.modelButtonText, color: theme.colors.primary }}>확인</Text>
              </Pressable>
            </View>
          </OverlayModal.Container>
        </OverlayModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignSelf: "stretch",
    width: "100%",
    height: 50,
    padding: 10,
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  label: { fontSize: 20, flexShrink: 1 },
  icon: { flexShrink: 0 },
  modalContainer: { gap: 10, alignItems: "center" },
  actions: { flexDirection: "row", gap: 10 },
  modalButton: { flex: 1, height: 50, justifyContent: "center", alignItems: "center" },
  modelButtonText: { fontSize: 20 },
});
