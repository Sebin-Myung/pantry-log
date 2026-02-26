import { Ingredient } from "@entities";
import { cancelAllLocalNotifications, scheduleLocalNotification } from "@shared";

export const scheduleExpirationNotifications = async (ingredients: Ingredient[]) => {
  // 1. 기존 알림 모두 취소
  await cancelAllLocalNotifications();

  // 2. 내일부터 7일간의 날짜(오전 8시) 기준점 생성
  const today = new Date();
  today.setHours(8, 0, 0, 0);

  for (let i = 1; i <= 7; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);

    // 해당 targetDate 기준으로 3일(3 * 24 * 60 * 60 * 1000) 이내에 만료되는 재료 필터링
    const imminentIngredients = ingredients.filter((ingredient) => {
      if (!ingredient.expirationDate) return false;
      const expDate = new Date(ingredient.expirationDate);
      expDate.setHours(0, 0, 0, 0);

      // targetDate의 시간은 08:00 이므로 자정으로 맞춘 비교용 객체
      const compareDate = new Date(targetDate);
      compareDate.setHours(0, 0, 0, 0);

      const diffTime = expDate.getTime() - compareDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 0일 ~ 3일 이내 임박
      return diffDays >= 0 && diffDays <= 3;
    });

    if (imminentIngredients.length > 0) {
      const ingredientNamesList = imminentIngredients.map((i) => `- ${i.name}`).join("\n");
      const bodyMessage = `유통기한이 임박한 재료가 있습니다! 😱\n${ingredientNamesList}`;

      // targetDate (오전 8시)에 알림 예약
      await scheduleLocalNotification("유통기한 알림", bodyMessage, targetDate);
    }
  }
};
