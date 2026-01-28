import { useState } from "react";
import { IUseDropdown } from "./types";

export function useDropdown<T>({ onValueChange }: IUseDropdown<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const onItemClick = (value: T) => {
    onValueChange(value);
    closeDropdown();
  };

  return {
    isOpen,
    openDropdown,
    closeDropdown,
    onItemClick,
  };
}
