import * as Notifications from "expo-notifications";
import {
  cancelAllLocalNotifications,
  getNotificationPermissions,
  requestNotificationPermissions,
  scheduleLocalNotification,
} from "./notifications";

jest.mock("expo-device", () => ({
  isDevice: true,
}));

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  SchedulableTriggerInputTypes: {
    DATE: "DATE",
  },
}));

describe("notifications 유틸리티 함수", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("requestNotificationPermissions", () => {
    it("권한이 이미 'granted'이면 true를 반환해야 한다", async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
      const result = await requestNotificationPermissions();
      expect(result).toBe(true);
      expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
    });

    it("권한이 없으면 요청 후 상태가 'granted'일 때 true를 반환해야 한다", async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "undetermined" });
      (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });

      const result = await requestNotificationPermissions();
      expect(result).toBe(true);
      expect(Notifications.requestPermissionsAsync).toHaveBeenCalled();
    });
  });

  describe("getNotificationPermissions", () => {
    it("권한 상태에 따라 true/false를 반환해야 한다", async () => {
      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "granted" });
      expect(await getNotificationPermissions()).toBe(true);

      (Notifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ status: "denied" });
      expect(await getNotificationPermissions()).toBe(false);
    });
  });

  describe("cancelAllLocalNotifications", () => {
    it("모든 스케줄된 외부 알림을 취소해야 한다", async () => {
      await cancelAllLocalNotifications();
      expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalledTimes(1);
    });
  });

  describe("scheduleLocalNotification", () => {
    it("주어진 정보로 로컬 알림을 스케줄링해야 한다", async () => {
      const triggerDate = new Date();
      await scheduleLocalNotification("테스트 제목", "테스트 내용", triggerDate);

      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalledWith({
        content: { title: "테스트 제목", body: "테스트 내용" },
        trigger: { type: "DATE", date: triggerDate },
      });
    });
  });
});
