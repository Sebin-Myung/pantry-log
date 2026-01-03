import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { OverlayModal } from "@shared";
import { useTheme } from "@shared/providers";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  DropdownContext,
  DropdownContextProps,
  DropdownItemProps,
  DropdownProps,
  useDropdown,
  useDropdownContext,
} from "../model";

function DropdownRoot<T>({ children, placeholder = "", onValueChange, ...props }: DropdownProps<T>) {
  const { isOpen, openDropdown, closeDropdown, onItemClick } = useDropdown({ onValueChange });
  const theme = useTheme();

  return (
    <DropdownContext.Provider value={{ ...props, onItemClick } as DropdownContextProps<unknown>}>
      <View>
        <Pressable
          onPress={openDropdown}
          accessibilityRole="button"
          accessibilityState={{ expanded: isOpen }}
          style={{ ...styles.container, borderColor: theme.colors.gray }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ ...styles.label, ...(!props.label ? { color: theme.colors.gray } : {}) }}>
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
          <ScrollView style={styles.itemContainer}>{children}</ScrollView>
        </OverlayModal>
      </View>
    </DropdownContext.Provider>
  );
}

function DropdownItem<T>({ label, value, isLast }: DropdownItemProps<T>) {
  const { value: selectedValue, onItemClick } = useDropdownContext();
  const theme = useTheme();

  const selected = value === selectedValue;

  return (
    <Pressable
      onPress={() => onItemClick(value)}
      accessibilityRole="menuitem"
      accessibilityState={{ selected }}
      style={{ ...styles.item, ...(isLast ? {} : { borderBottomWidth: 1, borderBottomColor: theme.colors.gray }) }}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>
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
  itemContainer: {
    position: "absolute",
    maxHeight: "80%",
    left: 20,
    right: 20,
    top: "50%",
    transform: [{ translateY: "-50%" }],
    backgroundColor: "#fff",
    borderRadius: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // Android shadow
    elevation: 6,
  },
  item: {
    minHeight: 48,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
