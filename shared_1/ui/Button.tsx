import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Href, Link, useRouter } from "expo-router";
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

export function LinkButton({ href, ...props }: BasePressableProps & { href: Href }) {
  return (
    <Link href={href} asChild>
      <Button {...props} />
    </Link>
  );
}

export function BackButton(props: BasePressableProps) {
  const router = useRouter();

  return (
    <Button onPress={() => router.back()} {...props}>
      <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
    </Button>
  );
}
