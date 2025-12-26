import { Pressable } from "react-native";

type BasePressableProps = React.ComponentProps<typeof Pressable>;

export function Button({ style, ...props }: BasePressableProps) {
  return (
    <Pressable
      hitSlop={8}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.3 : 1,
        },
        typeof style === "function"
          ? style({
              pressed,
              hovered: false,
            })
          : style,
      ]}
      {...props}
    />
  );
}
