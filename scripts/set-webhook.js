#!/usr/bin/env node

import { config } from "../lib/config.js";
import { getWebhookInfo, setChatMenuButton, setWebhook } from "../lib/telegram.js";

const webhookUrl = process.argv[2];

if (!webhookUrl) {
  console.error("Usage: node scripts/set-webhook.js <webhook-url>");
  console.error("Example: node scripts/set-webhook.js https://your-app.vercel.app/api/webhook");
  process.exit(1);
}

try {
  const result = await setWebhook(webhookUrl, config.webhookSecret);
  const menuButton = await setChatMenuButton();
  const info = await getWebhookInfo();

  console.log("Webhook set successfully:");
  console.log(
    JSON.stringify({ webhookUrl, setWebhook: result, menuButton, webhookInfo: info }, null, 2),
  );
} catch (error) {
  console.error("Failed to set webhook:", error.message);
  process.exit(1);
}
