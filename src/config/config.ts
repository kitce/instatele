import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const cwd = process.cwd();

const config = {
  botToken: process.env.BOT_TOKEN!,
  schedule: process.env.SCHEDULE!,
  files: {
    chats: path.join(cwd, './data/chats.json'),
    animation: 'CgACAgUAAxkBAAMkXvyxa_CJsXDEvgQQ9Ocu7DhC3XcAAmAAAz0gSVTr_KfcRf5OkBoE'
  }
};

export default config;
