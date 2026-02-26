import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PUSH_NOTIFICATION_STORAGE_KEY, pushNotificationStorage } from "./storage";

interface PushNotificationState {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
}

export const usePushNotificationStore = create<PushNotificationState>()(
  persist(
    (set) => ({
      isEnabled: false,
      setIsEnabled: (enabled) => set({ isEnabled: enabled }),
    }),
    {
      name: PUSH_NOTIFICATION_STORAGE_KEY,
      storage: createJSONStorage(() => pushNotificationStorage),
    }
  )
);
