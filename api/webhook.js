import { handleUpdate } from "../lib/handlers.js";
import { config } from "../lib/config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const secret = config.webhookSecret;
  if (secret && req.headers["x-telegram-bot-api-secret-token"] !== secret) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    await handleUpdate(req.body);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
