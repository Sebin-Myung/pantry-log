import { LabelValue, OnChange } from "@shared";
import { PropsWithChildren } from "react";

export interface DropdownContextProps<T> {
  label?: string;
  value?: T;
  onItemClick: (value: T) => void;
}

export interface IUseDropdown<T> {
  onValueChange: OnChange<T>;
}

export type DropdownProps<T> = PropsWithChildren<
  {
    placeholder?: string;
  } & Omit<DropdownContextProps<T>, "onItemClick"> &
    IUseDropdown<T>
>;

export interface DropdownItemProps<T> extends LabelValue<T> {
  isLast?: boolean;
}
