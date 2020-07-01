import dotenv from 'dotenv';

dotenv.config();

const config = {
  debug: !!process.env.DEBUG,
  port: parseInt(process.env.PORT || '8443'),
  botToken: process.env.BOT_TOKEN,
  webhookURL: process.env.WEBHOOK_URL,
  username: process.env.USERNAME!
};

if (!config.botToken) {
  throw new Error('Missing Telegram bot token');
}

if (!config.username) {
  throw new Error('Missing Instgram username');
}

export default config;
