import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BasePressableProps } from "../model/types";
import { useBackButton } from "../model/useBackButton";
import { Button } from "./Button";

export function BackButton(props: BasePressableProps) {
  const { goBack } = useBackButton();

  return (
    <Button onPress={goBack} {...props}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </Button>
  );
}
