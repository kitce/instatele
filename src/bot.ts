import config from './config/config';
import debugFactory from 'debug';
import { Telegraf, Middleware, Context as TelegrafContext } from 'telegraf';
import { getChats, joinChat, leaveChat } from './helpers/chat.helper';

const debug = debugFactory('hydreminder:bot');

const bot = new Telegraf(config.botToken);

const say = async (id: string | number) => {
  debug('say', id);
  try {
    await bot.telegram.sendAnimation(id, config.files.animation);
  } catch (err) {
    debug('caught', err);
  }
};

export const broadcast = async () => {
  debug('broadcast');
  const chats = await getChats();
  for (const id of chats) {
    say(id);
  }
};

const start: Middleware<TelegrafContext> = async (context) => {
  const { chat } = context;
  if (chat) {
    debug('start', chat.id);
    await joinChat(chat.id);
    await say(chat.id);
  }
};

bot.start(start);

bot.command('drink', async (context) => {
  const { chat } = context;
  if (chat) {
    await say(chat.id);
  }
});

bot.on('new_chat_members', (context, next) => {
  const { update } = context;
  const { message } = update;
  const { new_chat_members: users } = message!;
  for (const user of users!) {
    if (user.username === bot.options.username) {
      return start(context, next);
    }
  }
});

bot.on('left_chat_member', (context) => {
  const { chat, update } = context;
  const { message } = update;
  const { left_chat_member: user } = message!;
  const { username } = user!;
  if (chat && (username === bot.options.username)) {
    debug('leave group', chat.id);
    return leaveChat(chat.id);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
bot.catch((error: any) => {
  console.error(error);
});

export default bot;
