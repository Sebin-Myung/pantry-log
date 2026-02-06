import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DeletableCookingRecordItem } from "@features";
import { Calendar, getDateFormat, IconButton, ROUTES, useTheme } from "@shared";
import { EmptyLayout } from "@widgets";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useCookingRecordCalendarPage } from "../model/useCookingRecordCalendarPage";

export function CookingRecordCalendarPage() {
  const theme = useTheme();

  const { selectedDate, setSelectedDate, year, month, date, recordedDates, cookingRecords, refetchDatas } =
    useCookingRecordCalendarPage();

  return (
    <View style={{ flex: 1 }}>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} highlightDays={recordedDates} />
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.colors.gray,
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{`${year}년 ${month + 1}월 ${date}일`}</Text>
        <Link href={`${ROUTES.addCookingRecord}?date=${getDateFormat(selectedDate)}`} asChild>
          <IconButton>
            <MaterialCommunityIcons name="plus" size={24} color="black" />
          </IconButton>
        </Link>
      </View>
      {cookingRecords.length === 0 ? (
        <EmptyLayout lines={["해당 날짜에 등록한 요리 기록이 없습니다."]} />
      ) : (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10, gap: 10 }}>
          {cookingRecords.map((record) => (
            <DeletableCookingRecordItem key={record.id} {...record} onDelete={refetchDatas} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
