import { render } from "@testing-library/react-native";
import { Loading } from "./Loading";

jest.mock("../../../providers", () => ({
  useTheme: () => ({
    colors: { primary: "blue" },
  }),
}));

describe("Loading 컴포넌트", () => {
  it("ActivityIndicator가 존재하는지 확인해야 한다", () => {
    const { UNSAFE_getByType } = render(<Loading />);
    const { ActivityIndicator } = require("react-native");

    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
