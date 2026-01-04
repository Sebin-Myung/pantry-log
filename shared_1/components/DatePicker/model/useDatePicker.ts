import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";

export interface IUseDatePicker {
  date?: Date;
  setDate: (date: Date) => void;
}

export function useDatePicker({ date, setDate }: IUseDatePicker) {
  const defaultDate = date ?? new Date();

  const [tempDate, setTempDate] = useState<Date>(defaultDate);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const cancelModal = () => {
    setIsOpen(false);
    setTempDate(defaultDate);
  };

  const confirmModal = () => {
    setDate(tempDate);
    setIsOpen(false);
  };

  const onDateChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  return { date, tempDate, isOpen, openModal, cancelModal, confirmModal, onDateChange };
}
