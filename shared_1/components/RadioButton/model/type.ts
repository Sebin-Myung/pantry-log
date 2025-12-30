import { LabelValue, OnChange } from "@shared";
import { PropsWithChildren } from "react";

export type RadioButtonGroupProps<T> = PropsWithChildren<{ value?: T; onValueChange: OnChange<T> }>;

export interface RadioButtonItemProps<T> extends LabelValue<T> {
  isFirst?: boolean;
  isLast?: boolean;
}
