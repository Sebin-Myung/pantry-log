import "@testing-library/jest-native/extend-expect";

// Expo's winter polyfills set up lazy getters on the global object.
// When Jest tears down the test environment, it iterates over all properties on global,
// triggering these getters. Since the test scope has already ended, Jest's module loader
// intercepts the require() calls inside these getters and throws:
// "ReferenceError: You are trying to import a file outside of the scope of the test code"
//
// By accessing them here during setup, we force them to evaluate while the test scope
// is still active.

const expoLazyGlobals = [
  "__ExpoImportMetaRegistry",
  "structuredClone",
  "TextDecoder",
  "TextEncoder",
  "TextDecoderStream",
  "TextEncoderStream",
  "URL",
  "URLSearchParams",
];

expoLazyGlobals.forEach((name) => {
  try {
    const _ = global[name];
  } catch (e) {
    // Ignore any module resolution errors if the polyfill doesn't apply
  }
});

jest.mock("@expo/vector-icons/MaterialCommunityIcons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return function MockIcon(props) {
    return <View testID="mock-icon" {...props} />;
  };
});

jest.mock("expo-device", () => ({
  isDevice: true,
}));

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
  getPermissionsAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
  scheduleNotificationAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  getAllScheduledNotificationsAsync: jest.fn(() => Promise.resolve([])),
}));

jest.mock("react-native-mmkv", () => ({
  createMMKV: jest.fn(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    contains: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
    addOnValueChangedListener: jest.fn(),
  })),
}));
