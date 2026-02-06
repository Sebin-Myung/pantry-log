import { KeyboardAvoidingView, Notice } from "@shared";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { useAddCookingRecord } from "../../../features";
import { CookingRecordForm } from "../../../widgets";

export function AddCookingRecordPage() {
  const { onSubmit } = useAddCookingRecord();
  const { date } = useLocalSearchParams<{ date?: string }>();

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <Notice
          lines={[
            "사용된 재료들의 용량 반영은",
            "요리 기록을 추가할 때만 적용됩니다.",
            "",
            "* 전량 사용된 재료는 재고에서 삭제됩니다.",
          ]}
        />
        <CookingRecordForm initialState={{ cookedAt: date }} onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60, gap: 20 },
});
