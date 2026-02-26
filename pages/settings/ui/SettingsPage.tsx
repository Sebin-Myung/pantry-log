import { Switch, useTheme } from "@shared";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { usePushNotificationSetting } from "../model/usePushNotificationSetting";

export const SettingsPage = () => {
  const theme = useTheme();
  const { isEnabled, handleToggle } = usePushNotificationSetting();

  return (
    <ScrollView>
      <View style={{ ...styles.item, borderColor: theme.colors.gray }}>
        <Text style={styles.text}>푸시 알림</Text>
        <Switch onValueChange={handleToggle} value={isEnabled} />
      </View>
    </ScrollView>
  );
};

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
