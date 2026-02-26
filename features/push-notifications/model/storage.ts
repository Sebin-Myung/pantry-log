import { storage } from "@shared";

export const PUSH_NOTIFICATION_STORAGE_KEY = "push-notification-storage";

// Convert mmkv instance to a storage interface compatible with Zustand persist
export const pushNotificationStorage = {
  setItem: (value: string) => storage.set(PUSH_NOTIFICATION_STORAGE_KEY, value),
  getItem: () => {
    const value = storage.getString(PUSH_NOTIFICATION_STORAGE_KEY);
    return value ?? null;
  },
  removeItem: () => storage.remove(PUSH_NOTIFICATION_STORAGE_KEY),
};
