import { config } from "./config.js";

export const messages = {
  welcome:
    "👋 Вітаємо в <b>CC Shop</b>!\n\nОберіть потрібний розділ у меню нижче:",
  catalog:
    "🛍️ <b>Вигідні покупки у каталозі CC Shop</b>\n\nОберіть категорію:",
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
  const categoryRows = config.catalogCategories.map((category) => [
    {
      text: category.text,
      web_app: { url: category.url },
    },
  ]);

  return {
    inline_keyboard: [
      ...categoryRows,
      [{ text: "⬅️ Головне меню", callback_data: "main_menu" }],
    ],
  };
}
