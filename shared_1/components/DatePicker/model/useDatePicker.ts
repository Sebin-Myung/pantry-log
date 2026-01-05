import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";

export interface IUseDatePicker {
  initialDate?: Date;
  date?: Date;
  setDate: (date?: Date) => void;
}

export function useDatePicker({ initialDate, date, setDate }: IUseDatePicker) {
  const defaultDate = initialDate ?? new Date();

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

  const resetDate = () => {
    setDate(initialDate);
    setTempDate(defaultDate);
  };

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
    }
  }, [initialDate]);

  return { date, tempDate, isOpen, openModal, cancelModal, confirmModal, onDateChange, resetDate };
}
