import { QuantityField, StorageLocationRadioButton } from "@features";
import { DatePicker, Label, TextInput } from "@shared";
import { StyleSheet, View } from "react-native";
import { IUseIngredientForm } from "../model/type";
import { useIngredientForm } from "../model/useIngredientForm";

export function IngredientForm(props: IUseIngredientForm) {
  const { state, setField, isValid } = useIngredientForm(props);

  return (
    <View style={styles.container}>
      <Label text="보관 위치" required>
        <StorageLocationRadioButton selectedLocation={state.location} setSelectedLocation={setField("location")} />
      </Label>
      <Label text="제품명" required>
        <TextInput value={state.name} setValue={setField("name")} placeholder="제품명을 입력해주세요." />
      </Label>
      <Label text="용량" required>
        <QuantityField value={state.quantity} setValue={setField("quantity")} />
      </Label>
      <Label text="브랜드">
        <TextInput value={state.brand} setValue={setField("brand")} placeholder="브랜드를 입력해주세요." />
      </Label>
      <Label text="구매처">
        <TextInput
          value={state.purchaseSource}
          setValue={setField("purchaseSource")}
          placeholder="예) 이마트, 쿠팡, 시장 등"
        />
      </Label>
      <Label text="구매일자" required>
        <DatePicker
          date={state.purchaseDate}
          setDate={setField("purchaseDate")}
          initialDate={props.state.purchaseDate}
        />
      </Label>
      <Label text="제조일자">
        <DatePicker date={state.productionDate} setDate={setField("productionDate")} resetable />
      </Label>
      <Label text="소비기한">
        <DatePicker date={state.expirationDate} setDate={setField("expirationDate")} resetable />
      </Label>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20 },
});
