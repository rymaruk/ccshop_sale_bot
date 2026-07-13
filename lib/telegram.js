import { config } from "./config.js";

const API_BASE = `https://api.telegram.org/bot${config.token}`;

async function callTelegram(method, body) {
  const response = await fetch(`${API_BASE}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(`Telegram API error (${method}): ${data.description}`);
  }

  return data.result;
}

export function sendMessage(chatId, text, options = {}) {
  return callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...options,
  });
}

export function sendPhoto(chatId, photo, options = {}) {
  return callTelegram("sendPhoto", {
    chat_id: chatId,
    photo,
    parse_mode: "HTML",
    ...options,
  });
}

export function editMessageText(chatId, messageId, text, options = {}) {
  return callTelegram("editMessageText", {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    ...options,
  });
}

export function editMessageCaption(chatId, messageId, caption, options = {}) {
  return callTelegram("editMessageCaption", {
    chat_id: chatId,
    message_id: messageId,
    caption,
    parse_mode: "HTML",
    ...options,
  });
}

export function answerCallbackQuery(callbackQueryId, text) {
  return callTelegram("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: false,
  });
}

export function setWebhook(url, secretToken) {
  return callTelegram("setWebhook", {
    url,
    secret_token: secretToken || undefined,
    allowed_updates: ["message", "callback_query"],
  });
}

export function getWebhookInfo() {
  return callTelegram("getWebhookInfo", {});
}

export function setChatMenuButton(chatId) {
  const body = {
    menu_button: {
      type: "web_app",
      text: config.menuButtonText,
      web_app: { url: config.menuButtonUrl },
    },
  };

  if (chatId !== undefined) {
    body.chat_id = chatId;
  }

  return callTelegram("setChatMenuButton", body);
}
