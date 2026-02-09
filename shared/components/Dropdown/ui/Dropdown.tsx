import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../providers";
import { OverlayModal } from "../../Modal/ui/OverlayModal";
import { DropdownContext, useDropdownContext } from "../model/context";
import { DropdownContextProps, DropdownItemProps, DropdownProps } from "../model/types";
import { useDropdown } from "../model/useDropdown";

function DropdownRoot<T>({ children, placeholder = "", disabled, onValueChange, ...props }: DropdownProps<T>) {
  const { isOpen, openDropdown, closeDropdown, onItemClick } = useDropdown({ onValueChange });
  const theme = useTheme();

  return (
    <DropdownContext.Provider value={{ ...props, onItemClick } as DropdownContextProps<unknown>}>
      <View>
        <Pressable
          onPress={openDropdown}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen, disabled }}
          disabled={disabled}
          style={[
            { ...styles.container, borderColor: theme.colors.gray },
            disabled && { backgroundColor: theme.colors.lightGray },
          ]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.label, !props.label && { color: theme.colors.gray }]}>
            {props.label ?? placeholder}
          </Text>
          <MaterialCommunityIcons
            name="triangle-small-down"
            size={24}
            color={theme.colors.darkGray}
            style={styles.icon}
          />
        </Pressable>
        <OverlayModal visible={isOpen} onRequestClose={closeDropdown}>
          <OverlayModal.Container>{children}</OverlayModal.Container>
        </OverlayModal>
      </View>
    </DropdownContext.Provider>
  );
}

function DropdownItem<T>({ label, value, disabled, isLast }: DropdownItemProps<T>) {
  const { value: selectedValue, onItemClick } = useDropdownContext();
  const theme = useTheme();

  const selected = value === selectedValue;

  return (
    <Pressable
      disabled={disabled}
      onPress={() => onItemClick(value)}
      accessibilityRole="menuitem"
      accessibilityState={{ selected, disabled }}
      style={[
        styles.item,
        !isLast && { borderBottomWidth: 1, borderBottomColor: theme.colors.gray },
        disabled && { backgroundColor: theme.colors.lightGray },
      ]}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.label, disabled && { color: theme.colors.gray }]}>
        {label}
      </Text>
    </Pressable>
  );
}

export const Dropdown = { Root: DropdownRoot, Item: DropdownItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    width: "100%",
    height: 50,
    padding: 10,
    paddingRight: 4,
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  label: { fontSize: 20, flexShrink: 1 },
  icon: { flexShrink: 0 },
  item: {
    minHeight: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
