const required = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

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
    return required("SHOP_URL");
  },
  get categoryUrls() {
    return {
      pods: process.env.CATEGORY_PODS_URL || process.env.SHOP_URL,
      flavors: process.env.CATEGORY_FLAVORS_URL || process.env.SHOP_URL,
      cartridges: process.env.CATEGORY_CARTRIDGES_URL || process.env.SHOP_URL,
    };
  },
};
