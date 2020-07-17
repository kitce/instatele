import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const cwd = process.cwd();

const config = {
  botToken: process.env.BOT_TOKEN!,
  instagramUsername: process.env.INSTAGRAM_USERNAME!,
  schedule: process.env.SCHEDULE,
  files: {
    chats: path.join(cwd, './data/chats.json')
  }
};

if (!config.botToken) {
  throw new Error('Missing Telegram bot token');
}

if (!config.instagramUsername) {
  throw new Error('Missing Instgram username');
}

export default config;
