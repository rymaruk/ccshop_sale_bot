const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const shopBaseUrl = () =>
  (process.env.SHOP_URL || "https://ccshop.com.ua").replace(/\/$/, "");

export const config = {
  get token() {
    return required("TELEGRAM_BOT_TOKEN");
  },
  get webhookSecret() {
    return process.env.TELEGRAM_WEBHOOK_SECRET ?? "";
  },
  get adminUrl() {
    return required("ADMIN_URL");
  },
  get channelUrl() {
    return required("CHANNEL_URL");
  },
  get shopUrl() {
    return shopBaseUrl();
  },
  get menuButtonText() {
    return process.env.MENU_BUTTON_TEXT || "Відкрити магазин";
  },
  get menuButtonUrl() {
    return process.env.MENU_BUTTON_URL || shopBaseUrl();
  },
  get welcomePhotoUrl() {
    if (process.env.WELCOME_PHOTO_URL) {
      return process.env.WELCOME_PHOTO_URL;
    }

    const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    if (host) {
      return `https://${host}/welcome.png`;
    }

    return "https://ccshopsalebot.vercel.app/welcome.png";
  },
  get catalogCategories() {
    const base = shopBaseUrl();

    return [
      { text: "POD системи", url: `${base}/pod-systemy/` },
      { text: "Рідини для pod-систем", url: `${base}/aromatyzatory/` },
      { text: "Одноразки", url: `${base}/odnorazky/` },
      { text: "Картриджі для pod-систем", url: `${base}/kartrydzhi/` },
      { text: "Снюс", url: `${base}/snius/` },
      { text: "Кальяни та атрибутика", url: `${base}/kaliany-ta-atrybutyka/` },
    ];
  },
};
