import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ExpiryStatus } from "../model";
import { IngredientListItem } from "./IngredientListItem";

jest.mock("@shared", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    Badge: ({ children, backgroundColor, color }: any) => (
      <Text testID="shared-badge" style={{ backgroundColor, color }}>
        {children}
      </Text>
    ),
    calculateDday: jest.fn((date) => `Dday-${date.getTime()}`),
    useTheme: () => ({
      colors: {
        accentLight: "accentLightColor",
        accent: "accentColor",
        accentDark: "accentDarkColor",
        textSecondary: "textSecondaryColor",
        gray: "grayColor",
      },
    }),
  };
});

jest.mock("./StorageLocationBadge", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    StorageLocationBadge: ({ location }: any) => <Text testID="storage-location-badge">{location}</Text>,
  };
});

jest.mock("../model", () => ({
  ExpiryStatus: {
    APPROACHING: 0,
    IMMINENT: 1,
    EXPIRED: 2,
  },
  getExpiryStatus: jest.fn(),
  getQuantityString: jest.fn((q) => `${q.amount}${q.unit}`),
}));

import { calculateDday } from "@shared";
import { getExpiryStatus } from "../model";

describe("IngredientListItem", () => {
  const defaultProps = {
    id: "ing-1",
    name: "돼지고기",
    storageLocation: "frozen" as const,
    brand: "한돈",
    purchaseSource: "이마트",
    quantity: { amount: 500, unit: "g" as const },
    purchaseDate: "2024-03-01T00:00:00.000Z",
    productionDate: "2024-02-28T00:00:00.000Z",
    expirationDate: "2024-06-01T00:00:00.000Z",
    imageUrl: null,
    onPress: jest.fn(),
    onLongPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getExpiryStatus as jest.Mock).mockReturnValue(null);
  });

  it("기본 정보가 정상적으로 렌더링되어야 한다", () => {
    const { getByText, getByTestId, queryByTestId } = render(<IngredientListItem {...defaultProps} />);

    expect(getByText("돼지고기")).toBeTruthy();
    expect(getByTestId("storage-location-badge").props.children).toBe("frozen");
    expect(getByText("500g")).toBeTruthy();
    expect(getByText("한돈")).toBeTruthy();
    expect(getByText("이마트")).toBeTruthy();

    // 구매일, 제조일, 소비일 포맷팅 검증
    expect(getByText(new Date(defaultProps.purchaseDate).toLocaleDateString("ko-KR"))).toBeTruthy();
    expect(getByText(new Date(defaultProps.productionDate).toLocaleDateString("ko-KR"))).toBeTruthy();
    expect(getByText(new Date(defaultProps.expirationDate).toLocaleDateString("ko-KR"))).toBeTruthy();

    expect(queryByTestId("shared-badge")).toBeNull(); // 상태 뱃지는 없어야 함
  });

  it("수량이 없을 때 수량 텍스트가 렌더링되지 않아야 한다", () => {
    const { queryByText } = render(<IngredientListItem {...defaultProps} quantity={null} />);
    expect(queryByText("500g")).toBeNull();
  });

  it("제조일이 없을 때 제조일 항목이 렌더링되지 않아야 한다", () => {
    const { queryByText } = render(<IngredientListItem {...defaultProps} productionDate={null} />);
    expect(queryByText("제조일:")).toBeNull();
  });

  it("소비일이 없을 때 소비일 항목이 렌더링되지 않아야 한다", () => {
    const { queryByText } = render(<IngredientListItem {...defaultProps} expirationDate={null} />);
    expect(queryByText("소비일:")).toBeNull();
  });

  it("onPress와 onLongPress가 호출되어야 한다", () => {
    const { getByTestId } = render(<IngredientListItem {...defaultProps} />);
    const pressable = getByTestId("ingredient-list-item");

    fireEvent.press(pressable);
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);

    fireEvent(pressable, "longPress");
    expect(defaultProps.onLongPress).toHaveBeenCalledTimes(1);
  });

  describe("ExpiryStatus 연동 스타일 렌더링", () => {
    it("APPROACHING 상태일 때", () => {
      (getExpiryStatus as jest.Mock).mockReturnValue(ExpiryStatus.APPROACHING);
      (calculateDday as jest.Mock).mockReturnValue("D-5");

      const { getByTestId } = render(<IngredientListItem {...defaultProps} />);

      const badge = getByTestId("shared-badge");
      expect(badge.props.style).toEqual(
        expect.objectContaining({ backgroundColor: "accentLightColor", color: "#3A2E2A" }),
      );
      expect(badge.props.children).toBe("D-5");

      const pressable = getByTestId("ingredient-list-item");
      expect(pressable.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ borderColor: "#E6C7BE", borderWidth: 1.5 })]),
      );
    });

    it("IMMINENT 상태일 때", () => {
      (getExpiryStatus as jest.Mock).mockReturnValue(ExpiryStatus.IMMINENT);
      (calculateDday as jest.Mock).mockReturnValue("D-1");

      const { getByTestId } = render(<IngredientListItem {...defaultProps} />);

      const badge = getByTestId("shared-badge");
      expect(badge.props.style).toEqual(expect.objectContaining({ backgroundColor: "accentColor", color: "#2F2522" }));
      expect(badge.props.children).toBe("D-1");

      const pressable = getByTestId("ingredient-list-item");
      expect(pressable.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ borderColor: "#E0A392", borderWidth: 1.5 })]),
      );
    });

    it("EXPIRED 상태일 때", () => {
      (getExpiryStatus as jest.Mock).mockReturnValue(ExpiryStatus.EXPIRED);
      (calculateDday as jest.Mock).mockReturnValue("D+3");

      const { getByTestId } = render(<IngredientListItem {...defaultProps} />);

      const badge = getByTestId("shared-badge");
      expect(badge.props.style).toEqual(
        expect.objectContaining({ backgroundColor: "accentDarkColor", color: "#2B1E1A" }),
      );
      expect(badge.props.children).toBe("D+3");

      const pressable = getByTestId("ingredient-list-item");
      expect(pressable.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ borderColor: "#BF6A56", borderWidth: 1.5 })]),
      );
    });
  });
});
