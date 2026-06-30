import {
  answerCallbackQuery,
  editMessageText,
  sendMessage,
  setChatMenuButton,
} from "./telegram.js";
import { catalogKeyboard, mainMenuKeyboard, messages } from "./keyboards.js";

export async function handleUpdate(update) {
  if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
    return;
  }

  if (update.message?.text) {
    await handleMessage(update.message);
  }
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text.trim();

  if (text === "/start" || text === "🏠 Головне меню") {
    await setChatMenuButton(chatId);
    await sendMessage(chatId, messages.welcome, {
      reply_markup: mainMenuKeyboard(),
    });
    return;
  }

  await sendMessage(chatId, messages.welcome, {
    reply_markup: mainMenuKeyboard(),
  });
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  await answerCallbackQuery(callbackQuery.id);

  if (data === "catalog") {
    await editMessageText(chatId, messageId, messages.catalog, {
      reply_markup: catalogKeyboard(),
    });
    return;
  }

  if (data === "main_menu") {
    await editMessageText(chatId, messageId, messages.welcome, {
      reply_markup: mainMenuKeyboard(),
    });
  }
}
