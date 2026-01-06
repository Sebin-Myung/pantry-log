import { Href, Link } from "expo-router";
import { BasePressableProps } from "../model/types";
import { IconButton } from "./IconButton";

export function LinkButton({ href, ...props }: BasePressableProps & { href: Href }) {
  return (
    <Link href={href} asChild>
      <IconButton {...props} />
    </Link>
  );
}
