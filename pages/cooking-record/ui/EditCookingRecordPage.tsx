import { IUseEditCookingRecord, useEditCookingRecord } from "@features";
import { KeyboardAvoidingView, Loading } from "@shared";
import { EditCookingRecordForm } from "@widgets";
import { ScrollView, StyleSheet } from "react-native";

export function EditCookingRecordPage(props: IUseEditCookingRecord) {
  const { initialState, onSubmit } = useEditCookingRecord(props);

  if (!initialState) return <Loading />;

  return (
    <KeyboardAvoidingView>
      <ScrollView contentContainerStyle={styles.container}>
        <EditCookingRecordForm initialState={initialState} onSubmit={onSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
});
