import { config } from "../lib/config.js";
import { getWebhookInfo, setChatMenuButton, setWebhook } from "../lib/telegram.js";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (!vercelUrl) {
    res.status(400).json({
      error: "VERCEL_URL is not set. Deploy to Vercel first or pass ?url= manually.",
    });
    return;
  }

  const webhookUrl =
    req.query.url?.toString() ||
    `https://${vercelUrl}/api/webhook`;

  try {
    const result = await setWebhook(webhookUrl, config.webhookSecret);
    const menuButton = await setChatMenuButton();
    const info = await getWebhookInfo();

    res.status(200).json({
      ok: true,
      webhookUrl,
      setWebhook: result,
      menuButton,
      webhookInfo: info,
    });
  } catch (error) {
    console.error("Set webhook error:", error);
    res.status(500).json({ error: error.message });
  }
}
