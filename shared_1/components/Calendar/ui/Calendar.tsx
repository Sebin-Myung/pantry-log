import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { applyAlpha, padZero } from "../../../lib/utils";
import { useTheme } from "../../../providers/AppThemeProvider";
import { IconButton } from "../../Button/ui/IconButton";
import { IUseCalendar, useCalendar } from "../model/useCalendar";
import { getDateFormat, isSameDate } from "../model/utils";

interface CalendarProps extends IUseCalendar {
  highlightDays?: string[]; // YYYY-MM-DD
}

export function Calendar({ highlightDays = [], ...props }: CalendarProps) {
  const { today, year, month, calendarCells, onDateClick, onPrevMonthClick, onNextMonthClick } = useCalendar(props);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton onPress={onPrevMonthClick}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </IconButton>
        <Text style={styles.month}>{`${year}.${padZero(month + 1)}`}</Text>
        <IconButton onPress={onNextMonthClick}>
          <MaterialCommunityIcons name="chevron-right" size={24} color="black" />
        </IconButton>
      </View>
      <View style={styles.grid}>
        {calendarCells.map((cell, i) => {
          const isToday = isSameDate(today, cell.date);
          const isSelected = isSameDate(props.selectedDate, cell.date);
          const isSunday = cell.date.getDay() === 0;
          const isSaturday = cell.date.getDay() === 6;

          const formattedDate = getDateFormat(cell.date);
          const isHighlighted = highlightDays.some((day) => day === formattedDate);

          return (
            <Pressable key={i} style={styles.cell} onPress={() => onDateClick(cell.date)}>
              <View
                style={[
                  styles.cellBox,
                  isSelected && {
                    borderWidth: 1,
                    borderColor: theme.colors.accent,
                    backgroundColor: applyAlpha(theme.colors.accent, 0.3),
                  },
                ]}>
                <View
                  style={[
                    styles.cellCircle,
                    isToday && { backgroundColor: theme.colors.text },
                    isHighlighted && { borderWidth: 3, borderColor: theme.colors.accentDark },
                  ]}>
                  <Text
                    style={[
                      { fontSize: 16, color: theme.colors.text },
                      isSunday && { color: "red" },
                      isSaturday && { color: "blue" },
                      isSelected && { fontWeight: "bold" },
                      isToday && { color: theme.colors.white, fontWeight: "bold" },
                      !cell.isCurrentMonth && { opacity: 0.3 },
                    ]}>
                    {cell.date.getDate()}
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  month: { fontSize: 24, fontWeight: "bold" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: `${100 / 7}%` },
  cellBox: { width: "100%", aspectRatio: 1, justifyContent: "center", alignItems: "center" },
  cellCircle: { width: 32, height: 32, justifyContent: "center", alignItems: "center", borderRadius: "100%" },
});
