import { setChatMenuButton } from "../lib/telegram.js";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const menuButton = await setChatMenuButton();
    res.status(200).json({ ok: true, menuButton });
  } catch (error) {
    console.error("Set menu button error:", error);
    res.status(500).json({ error: error.message });
  }
}
