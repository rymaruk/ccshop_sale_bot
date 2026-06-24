# CC Shop Sale Bot

Telegram bot for [t.me/ccshop_sale_bot](https://t.me/ccshop_sale_bot) — main menu, product catalog categories, admin chat link, and channel subscription. Hosted on Vercel as a serverless webhook.

## Bot flow

```
/start
  └── Main menu
        ├── 🛍️ Переглянути каталог → category buttons → shop website
        ├── 👤 Написати адміну → admin Telegram chat
        └── 📢 Підписатись на ТГ канал → Telegram channel
```

## Project structure

```
api/
  webhook.js       # Telegram webhook endpoint
  set-webhook.js   # One-time helper to register webhook on Vercel
lib/
  config.js        # Environment variables
  handlers.js      # /start and button logic
  keyboards.js     # Inline keyboards and messages
  telegram.js      # Telegram Bot API client
scripts/
  set-webhook.js   # CLI to register webhook locally
```

---

## Step-by-step setup

### Step 1. Prerequisites

Install:

- [Node.js 20+](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for local dev)

```bash
npm i -g vercel
```

### Step 2. Prepare links

Collect these URLs before deployment:

| Variable | Example | Description |
|----------|---------|-------------|
| `ADMIN_URL` | `https://t.me/ccshop_cc` | Admin Telegram profile |
| `CHANNEL_URL` | `https://t.me/your_channel` | Shop Telegram channel |
| `SHOP_URL` | `https://your-shop.com` | Main shop website |
| `CATEGORY_PODS_URL` | `https://your-shop.com/pods` | Optional, defaults to `SHOP_URL` |
| `CATEGORY_FLAVORS_URL` | `https://your-shop.com/flavors` | Optional |
| `CATEGORY_CARTRIDGES_URL` | `https://your-shop.com/cartridges` | Optional |

### Step 3. Push code to GitHub

```bash
cd ccshop_sale_bot
git add .
git commit -m "Add Telegram bot for CC Shop"
git remote add origin https://github.com/YOUR_USERNAME/ccshop_sale_bot.git
git push -u origin main
```

### Step 4. Deploy to Vercel

**Option A — Vercel Dashboard**

1. Open [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework Preset: **Other**
4. Click **Deploy**

**Option B — Vercel CLI**

```bash
vercel
vercel --prod
```

After deploy, note your production URL, e.g. `https://ccshop-sale-bot.vercel.app`.

### Step 5. Add environment variables on Vercel

In Vercel: **Project → Settings → Environment Variables**

Add for **Production** (and Preview if needed):

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from [@BotFather](https://t.me/BotFather) |
| `TELEGRAM_WEBHOOK_SECRET` | Random string, e.g. `openssl rand -hex 32` |
| `ADMIN_URL` | `https://t.me/your_admin` |
| `CHANNEL_URL` | `https://t.me/your_channel` |
| `SHOP_URL` | `https://your-shop.com` |

Optional category URLs: `CATEGORY_PODS_URL`, `CATEGORY_FLAVORS_URL`, `CATEGORY_CARTRIDGES_URL`.

Redeploy after adding variables:

```bash
vercel --prod
```

### Step 6. Register Telegram webhook

Replace `YOUR_APP` with your Vercel domain:

```bash
curl "https://YOUR_APP.vercel.app/api/set-webhook"
```

Or with a custom domain:

```bash
curl "https://YOUR_APP.vercel.app/api/set-webhook?url=https://your-domain.com/api/webhook"
```

Expected response:

```json
{
  "ok": true,
  "webhookUrl": "https://YOUR_APP.vercel.app/api/webhook",
  "webhookInfo": { "url": "...", "has_custom_certificate": false }
}
```

**Alternative — CLI (local):**

```bash
cp .env.example .env
# Edit .env with your values

node scripts/set-webhook.js https://YOUR_APP.vercel.app/api/webhook
```

### Step 7. Test the bot

1. Open [t.me/ccshop_sale_bot](https://t.me/ccshop_sale_bot)
2. Send `/start`
3. Check:
   - Main menu with 3 buttons
   - **Переглянути каталог** → categories → website links
   - **Написати адміну** → admin chat
   - **Підписатись на ТГ канал** → channel

### Step 8. Local development (optional)

```bash
cp .env.example .env
# Fill in TELEGRAM_BOT_TOKEN and other variables

vercel dev
```

Use [ngrok](https://ngrok.com/) for a public HTTPS URL, then:

```bash
node scripts/set-webhook.js https://YOUR_NGROK_URL/api/webhook
```

---

## Troubleshooting

**Bot does not respond**

- Confirm env vars are set on Vercel and you redeployed
- Check webhook: `curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"`
- Check Vercel logs: **Project → Logs**

**401 Unauthorized on webhook**

- `TELEGRAM_WEBHOOK_SECRET` must match between Vercel env and the value used when calling `set-webhook`

**Buttons open wrong links**

- Update `ADMIN_URL`, `CHANNEL_URL`, `SHOP_URL` (and category URLs) in Vercel env vars, then redeploy

---

## Security notes

- Never commit `.env` or bot tokens to Git
- Use `TELEGRAM_WEBHOOK_SECRET` in production
- Rotate the token in [@BotFather](https://t.me/BotFather) if it was exposed
