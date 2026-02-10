import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { getDateFormat } from "../../../lib";

export interface IUseDatePicker {
  date?: Date;
  setDate: (date?: Date) => void;
}

export function useDatePicker({ date, setDate }: IUseDatePicker) {
  const defaultDate = new Date();

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
    setDate(undefined);
    setTempDate(defaultDate);
  };

  useEffect(() => {
    if (!date) return;

    if (getDateFormat(date) === getDateFormat(tempDate)) return;

    setTempDate(date);
  }, [date]);

  return { date, tempDate, isOpen, openModal, cancelModal, confirmModal, onDateChange, resetDate };
}
