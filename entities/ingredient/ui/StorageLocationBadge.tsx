import { Badge, useTheme } from "@shared";
import { StorageLocation, StorageLocationKorean } from "../model";

interface Props {
  location: StorageLocation;
}

export function StorageLocationBadge({ location }: Props) {
  const theme = useTheme();

  return (
    <Badge backgroundColor={theme.colors[`${location}Light`]} color={theme.colors[location]}>
      {StorageLocationKorean[location]}
    </Badge>
  );
}
