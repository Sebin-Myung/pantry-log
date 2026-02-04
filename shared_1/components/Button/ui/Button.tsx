import { useTheme } from "@shared/providers";
import { ActivityIndicator, Pressable, Text } from "react-native";
import { ButtonContext, useButtonContext } from "../model/context";
import { BasePressableProps, ButtonVariant } from "../model/types";

const ButtonTextColor: Record<ButtonVariant, string> = {
  primary: "white",
  secondary: "white",
  tertiary: "black",
};

interface ButtonProps extends BasePressableProps {
  variant?: ButtonVariant;
  isSubmitting?: boolean;
}

function Button({ variant = "primary", isSubmitting, style, children, disabled, ...props }: ButtonProps) {
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
          disabled && { opacity: 0.5 },
          typeof style === "function"
            ? style({
                pressed,
                hovered: false,
              })
            : style,
        ]}
        disabled={disabled || isSubmitting}
        {...props}>
        {isSubmitting ? <ActivityIndicator size="small" color={ButtonTextColor[variant]} /> : children}
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
          color: ButtonTextColor[variant],
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
