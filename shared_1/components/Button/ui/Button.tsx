import { useTheme } from "@shared/providers";
import { Pressable, Text } from "react-native";
import { ButtonContext, useButtonContext } from "../model/context";
import { BasePressableProps, ButtonVariant } from "../model/types";

interface ButtonProps extends BasePressableProps {
  variant?: ButtonVariant;
}

function Button({ variant = "primary", style, children, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <ButtonContext.Provider value={{ variant }}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: theme.colors[variant],
            borderRadius: 10,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            alignSelf: "stretch",
            opacity: pressed ? 0.8 : 1,
          },
          props.disabled && { opacity: 0.5 },
          typeof style === "function"
            ? style({
                pressed,
                hovered: false,
              })
            : style,
        ]}
        {...props}>
        {children}
      </Pressable>
    </ButtonContext.Provider>
  );
}

type BaseTextProps = React.ComponentProps<typeof Text>;

function ButtonText({ style, children, ...props }: BaseTextProps) {
  const { variant } = useButtonContext();

  return (
    <Text
      style={[
        {
          color: variant === "tertiary" ? "black" : "white",
          fontSize: 20,
          fontWeight: "600",
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
}

Button.Text = ButtonText;

export { Button };
