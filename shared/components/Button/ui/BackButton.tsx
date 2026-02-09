import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouterFunc } from "../../../lib/hooks";
import { BasePressableProps } from "../model/types";
import { IconButton } from "./IconButton";

export function BackButton(props: BasePressableProps) {
  const { goBack } = useRouterFunc();

  return (
    <IconButton onPress={goBack} {...props}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </IconButton>
  );
}
