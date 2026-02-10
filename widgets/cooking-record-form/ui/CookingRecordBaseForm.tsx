import { Button, DatePicker, Label, TextInput } from "@shared";
import { StyleSheet, View } from "react-native";
import { IUseCookingRecordBaseForm } from "../model/types";
import { useCookingRecordBaseForm } from "../model/useCookingRecordBaseForm";

export function CookingRecordBaseForm({ children, ...props }: React.PropsWithChildren<IUseCookingRecordBaseForm>) {
  const { name, setName, cookedAt, setCookedAt, isValid, isSubmitting, onSubmit } = useCookingRecordBaseForm(props);

  return (
    <View style={styles.container}>
      <Label text="이름" required>
        <TextInput value={name} setValue={setName} placeholder="요리의 이름을 입력해주세요." />
      </Label>
      <Label text="만든 날" required>
        <DatePicker date={cookedAt} setDate={setCookedAt} />
      </Label>
      {children}
      <Button disabled={!isValid} isSubmitting={isSubmitting} onPress={onSubmit}>
        <Button.Text>확인</Button.Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
});
