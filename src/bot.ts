import config from './config/config';
import debugFactory from 'debug';
import shuffle from 'lodash/shuffle';
import { Telegraf, Middleware, Context as TelegrafContext } from 'telegraf';
import { getChats, joinChat, leaveChat } from './helpers/chat.helper';
import { getPosts } from './helpers/instrgram.helper';

const debug = debugFactory('instatele:bot');

const bot = new Telegraf(config.botToken);

export const fetching = getPosts(config.instagramUsername);

const greet = async (id: string | number) => {
  debug('greet', id);
  try {
    const posts = await fetching;
    const post = shuffle(posts)[0];
    if (post) {
      await bot.telegram.sendMessage(id, post.url);
    }
  } catch (err) {
    debug('caught', err);
  }
};

export const broadcast = async () => {
  debug('broadcast');
  const chats = await getChats();
  for (const id of chats) {
    greet(id);
  }
};

const start: Middleware<TelegrafContext> = async (context) => {
  const { chat } = context;
  if (chat) {
    debug('start', chat.id);
    await joinChat(chat.id);
    await greet(chat.id);
  }
};

const stop: Middleware<TelegrafContext> = async (context) => {
  const { chat } = context;
  if (chat) {
    debug('stop', chat.id);
    await leaveChat(chat.id);
  }
};

const hi: Middleware<TelegrafContext> = async (context) => {
  const { chat } = context;
  if (chat) {
    await greet(chat.id);
  }
};

/**
 * Commands
 */
bot.command('start', start);

bot.command('stop', stop);

bot.command('hi', hi);

/**
 * Events
 */
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

bot.on('left_chat_member', (context, next) => {
  const { chat, update } = context;
  const { message } = update;
  const { left_chat_member: user } = message!;
  const { username } = user!;
  if (chat && (username === bot.options.username)) {
    return stop(context, next);
  }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
bot.catch((error: any) => {
  console.error(error);
});

export default bot;
