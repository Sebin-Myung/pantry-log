import { useIngredientStore } from "@entities";
import { useEffect } from "react";
import { scheduleExpirationNotifications } from "../model/scheduler";
import { usePushNotificationStore } from "../model/store";

export function PushNotificationSync() {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const isEnabled = usePushNotificationStore((state) => state.isEnabled);

  useEffect(() => {
    if (isEnabled) {
      scheduleExpirationNotifications(ingredients);
    }
  }, [ingredients, isEnabled]);

  return null;
}
