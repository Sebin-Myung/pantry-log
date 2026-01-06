import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BasePressableProps } from "../model/types";
import { useBackButton } from "../model/useBackButton";
import { IconButton } from "./IconButton";

export function BackButton(props: BasePressableProps) {
  const { goBack } = useBackButton();

  return (
    <IconButton onPress={goBack} {...props}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </IconButton>
  );
}
