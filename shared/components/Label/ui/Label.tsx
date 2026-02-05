import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Label({ text, required, children }: PropsWithChildren<{ text: string; required?: boolean }>) {
  return (
    <View>
      <View style={styles.labelBox}>
        <Text>{text}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  labelBox: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  required: { color: "red", marginLeft: 2 },
});
