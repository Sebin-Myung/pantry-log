import { BasePressableProps, useTheme } from "@shared";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getQuantityString, Ingredient } from "../model";
import { StorageLocationBadge } from "./StorageLocationBadge";

interface IngredientListItemProps extends Ingredient, Pick<BasePressableProps, "onPress" | "onLongPress"> {}

export function IngredientListItem({
  id,
  name,
  storageLocation,
  brand,
  purchaseSource,
  quantity,
  purchaseDate,
  productionDate,
  expirationDate,
  imageUrl,
  onPress,
  onLongPress,
}: IngredientListItemProps) {
  const theme = useTheme();

  return (
    <Pressable style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      {/* {imageUrl && <Image style={{ ...styles.image, borderColor: theme.colors.gray }} />} */}
      <View style={styles.infoSection}>
        <View style={styles.title}>
          <StorageLocationBadge location={storageLocation} />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
            {name}
          </Text>
          {quantity && (
            <Text style={{ flexShrink: 0, color: theme.colors.textSecondary }}>{getQuantityString(quantity)}</Text>
          )}
        </View>

        <View style={styles.subInfoSection}>
          <View style={styles.subInfo}>
            <Text style={{ ...styles.subInfoTitle, color: theme.colors.textSecondary }}>구매일:</Text>
            <Text style={{ ...styles.subInfoContent, flexShrink: 0, color: theme.colors.textSecondary }}>
              {new Date(purchaseDate).toLocaleDateString("ko-KR")}
            </Text>
          </View>
        </View>
        {productionDate && (
          <View style={styles.subInfoSection}>
            <View style={styles.subInfo}>
              <Text style={{ ...styles.subInfoTitle, color: theme.colors.textSecondary }}>제조일:</Text>
              <Text style={{ ...styles.subInfoContent, color: theme.colors.textSecondary }}>
                {new Date(productionDate).toLocaleDateString("ko-KR")}
              </Text>
            </View>
          </View>
        )}
        {expirationDate && (
          <View style={styles.subInfoSection}>
            <View style={styles.subInfo}>
              <Text style={{ ...styles.subInfoTitle, color: theme.colors.textSecondary }}>소비일:</Text>
              <Text style={{ ...styles.subInfoContent, color: theme.colors.textSecondary }}>
                {new Date(expirationDate).toLocaleDateString("ko-KR")}
              </Text>
            </View>
          </View>
        )}

        <View style={{ ...styles.divider, backgroundColor: theme.colors.gray }} />

        <View style={styles.subInfoSection}>
          <View style={{ ...styles.subInfo, flex: 1 }}>
            <Text style={{ ...styles.subInfoTitle, color: theme.colors.textSecondary }}>브랜드:</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ ...styles.subInfoContent, flexShrink: 1, color: theme.colors.textSecondary }}>
              {brand}
            </Text>
          </View>
          <View style={{ ...styles.subInfo, flex: 1 }}>
            <Text style={{ ...styles.subInfoTitle, color: theme.colors.textSecondary }}>구매처:</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ ...styles.subInfoContent, flexShrink: 1, color: theme.colors.textSecondary }}>
              {purchaseSource}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
  },
  image: { borderWidth: 1, width: 50, height: 50, borderRadius: 8 },
  infoSection: { flex: 1, gap: 8 },
  title: { flexDirection: "row", gap: 8, alignItems: "center" },
  name: { flexShrink: 1, flexGrow: 0, minWidth: 0 },
  subInfoSection: { flexDirection: "row", gap: 8 },
  subInfo: { flexDirection: "row", alignItems: "center", gap: 4 },
  subInfoTitle: { flexShrink: 0, fontSize: 12 },
  subInfoContent: { fontSize: 12, flexShrink: 0 },
  divider: { width: "100%", height: 1 },
});
