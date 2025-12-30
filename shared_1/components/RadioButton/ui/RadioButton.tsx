import { applyAlpha } from "@shared";
import { useTheme } from "@shared/providers";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { RadioButtonContext, RadioButtonGroupProps, RadioButtonItemProps, useRadioButtonContext } from "../model";

function RadioButtonGroup<T>({ children, ...props }: RadioButtonGroupProps<T>) {
  return (
    <RadioButtonContext.Provider value={props as RadioButtonGroupProps<unknown>}>
      <View style={styles.container}>{children}</View>
    </RadioButtonContext.Provider>
  );
}

function RadioButtonItem<T>({ label, value, isFirst, isLast }: RadioButtonItemProps<T>) {
  const theme = useTheme();
  const { value: selectedValue, onValueChange } = useRadioButtonContext<T>();

  return (
    <Pressable
      style={{
        ...styles.item,
        ...(isFirst ? styles.firstItem : {}),
        ...(isLast ? styles.lastItem : {}),
        ...(selectedValue === value
          ? { borderColor: theme.colors.primary, backgroundColor: applyAlpha(theme.colors.primary, 0.3) }
          : { borderColor: theme.colors.gray }),
      }}
      onPress={() => onValueChange(value)}>
      <Text style={styles.itemText}>{label}</Text>
    </Pressable>
  );
}

export const RadioButton = { Group: RadioButtonGroup, Item: RadioButtonItem };

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: 50,
    borderWidth: 1,
  },
  firstItem: { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
  lastItem: { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
  itemText: {
    fontSize: 20,
  },
});
