import { config } from "./config.js";

export const messages = {
  welcome:
    "👋 Вітаємо в <b>CC Shop</b>!\n\nОберіть потрібний розділ у меню нижче:",
  catalog:
    "🛍️ <b>Вигідні покупки у каталозі CC Shop</b>",
};

export function mainMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🛍️ Переглянути каталог", callback_data: "catalog" }],
      [{ text: "👤 Написати адміну", url: config.adminUrl }],
      [{ text: "📢 Підписатись на ТГ канал", url: config.channelUrl }],
    ],
  };
}

export function catalogKeyboard() {
  const urls = config.categoryUrls;

  return {
    inline_keyboard: [
      [{ text: "💨 Pod системи", url: urls.pods }],
      [{ text: "🧪 Ароматизатори", url: urls.flavors }],
      [{ text: "🔋 Картриджі", url: urls.cartridges }],
      [{ text: "⬅️ Головне меню", callback_data: "main_menu" }],
    ],
  };
}
