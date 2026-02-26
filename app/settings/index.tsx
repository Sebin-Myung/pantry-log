import { useTheme } from "@shared";
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsPage() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const theme = useTheme();

  return (
    <ScrollView>
      <View style={{ ...styles.item, borderColor: theme.colors.gray }}>
        <Text style={styles.text}>푸시 알림</Text>
        <View>
          <Switch
            trackColor={{ false: theme.colors.lightGray, true: theme.colors.primary }}
            thumbColor={theme.colors.white}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  text: { fontSize: 16 },
});
