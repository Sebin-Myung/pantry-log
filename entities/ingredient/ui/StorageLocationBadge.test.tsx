import { render } from "@testing-library/react-native";
import React from "react";
import { StorageLocationKorean } from "../model";
import { StorageLocationBadge } from "./StorageLocationBadge";

jest.mock("@shared", () => ({
  Badge: ({ children, backgroundColor, color }: any) => {
    const React = require("react");
    const { Text } = require("react-native");
    return (
      <Text testID="mock-badge" style={{ backgroundColor, color }}>
        {children}
      </Text>
    );
  },
  useTheme: () => ({
    colors: {
      fridgeLight: "fridgeLightColor",
      fridge: "fridgeColor",
      frozenLight: "frozenLightColor",
      frozen: "frozenColor",
      pantryLight: "pantryLightColor",
      pantry: "pantryColor",
    },
  }),
}));

describe("StorageLocationBadge", () => {
  it.each([
    ["fridge", StorageLocationKorean.fridge, "fridgeLightColor", "fridgeColor"],
    ["frozen", StorageLocationKorean.frozen, "frozenLightColor", "frozenColor"],
    ["pantry", StorageLocationKorean.pantry, "pantryLightColor", "pantryColor"],
  ] as const)("location이 %s일 때 올바른 텍스트와 색상이 렌더링되어야 한다", (location, text, bgColor, color) => {
    const { getByTestId, getByText } = render(<StorageLocationBadge location={location} />);

    expect(getByText(text)).toBeTruthy();

    const badge = getByTestId("mock-badge");
    expect(badge.props.style).toEqual({ backgroundColor: bgColor, color });
  });
});
