import { config } from "./config.js";
import {
  answerCallbackQuery,
  editMessageCaption,
  editMessageText,
  sendMessage,
  sendPhoto,
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

async function sendWelcome(chatId) {
  await setChatMenuButton(chatId);

  try {
    await sendPhoto(chatId, config.welcomePhotoUrl, {
      caption: messages.welcome,
      reply_markup: mainMenuKeyboard(),
    });
  } catch (error) {
    console.error("Failed to send welcome photo:", error);
    await sendMessage(chatId, messages.welcome, {
      reply_markup: mainMenuKeyboard(),
    });
  }
}

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text.trim();

  if (text === "/start" || text === "🏠 Головне меню") {
    await sendWelcome(chatId);
    return;
  }

  await sendWelcome(chatId);
}

async function updateMenuMessage(callbackQuery, caption, replyMarkup) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const hasPhoto = Boolean(callbackQuery.message.photo?.length);

  if (hasPhoto) {
    await editMessageCaption(chatId, messageId, caption, {
      reply_markup: replyMarkup,
    });
    return;
  }

  await editMessageText(chatId, messageId, caption, {
    reply_markup: replyMarkup,
  });
}

async function handleCallbackQuery(callbackQuery) {
  const data = callbackQuery.data;

  await answerCallbackQuery(callbackQuery.id);

  if (data === "catalog") {
    await updateMenuMessage(callbackQuery, messages.catalog, catalogKeyboard());
    return;
  }

  if (data === "main_menu") {
    await updateMenuMessage(callbackQuery, messages.welcome, mainMenuKeyboard());
  }
}
