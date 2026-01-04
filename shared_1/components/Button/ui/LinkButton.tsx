import { Href, Link } from "expo-router";
import { BasePressableProps } from "../model/types";
import { Button } from "./Button";

export function LinkButton({ href, ...props }: BasePressableProps & { href: Href }) {
  return (
    <Link href={href} asChild>
      <Button {...props} />
    </Link>
  );
}
