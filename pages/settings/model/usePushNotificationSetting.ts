import { useIngredientStore } from "@entities";
import { scheduleExpirationNotifications, usePushNotificationStore } from "@features";
import { cancelAllLocalNotifications, requestNotificationPermissions } from "@shared";
import * as Linking from "expo-linking";
import { Alert } from "react-native";

export const usePushNotificationSetting = () => {
  const { isEnabled, setIsEnabled } = usePushNotificationStore();
  const { ingredients } = useIngredientStore();

  const handleToggle = async (newValue: boolean) => {
    if (!newValue) {
      // 꺼질 때는 기존 예약 모두 취소
      setIsEnabled(false);
      await cancelAllLocalNotifications();
      return;
    }

    // 권한 요청
    const granted = await requestNotificationPermissions();
    if (!granted) {
      Alert.alert("알림 권한 필요", "푸시 알림을 받으시려면 기기 설정에서 알림 권한을 허용해주세요.", [
        { text: "취소", style: "cancel" },
        { text: "설정으로 이동", onPress: () => Linking.openSettings() },
      ]);
      setIsEnabled(false);
      return;
    }

    // 권한 허용 후 켜질 때는 즉시 스케줄링 동기화
    setIsEnabled(true);
    await scheduleExpirationNotifications(ingredients);
  };

  return { isEnabled, handleToggle };
};
