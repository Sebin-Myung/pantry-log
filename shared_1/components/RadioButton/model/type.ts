import { PropsWithChildren } from "react";
import { LabelValue, OnChange } from "../../../types";

export type RadioButtonGroupProps<T> = PropsWithChildren<{ value?: T; onValueChange: OnChange<T> }>;

export interface RadioButtonItemProps<T> extends LabelValue<T> {
  isFirst?: boolean;
  isLast?: boolean;
}
