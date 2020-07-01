/* eslint-disable @typescript-eslint/camelcase */
import config from './config/config';
import debugFactory from 'debug';
import shuffle from 'lodash/shuffle';
import { Telegraf } from 'telegraf';
import fetcher, { Type } from './helpers/instagram';

const debug = debugFactory('instatele:bot');

export const fetching = fetcher(config.username, 999, 1000 * 60 * 60);

const bot = new Telegraf(config.botToken!);

bot.command('random', async (context, next) => {
  const { message } = context;
  const { chat, message_id: messageId } = message!;
  const posts = (await fetching)();
  const post = shuffle(posts)[0];
  if (post) {
    debug('post', post);
    const emoji = post.type === Type.Video ? '🎬' : '🖼';
    const body = `${emoji} <a href="${post.url}">View in Instagram</a>`;
    try {
      const media = post.medias.map((media) => ({
        type: media.type === Type.Video ? 'video' : 'photo',
        media: media.media,
        caption: `${body}\n\n${post.text}`,
        parse_mode: 'HTML'
      }));
      debug('reply', chat.id, messageId, media);
      await context.replyWithMediaGroup(
        media,
        { reply_to_message_id: messageId }
      );
    } catch (err) {
      debug('random err', err);
      await context.reply(
        body,
        { reply_to_message_id: messageId, parse_mode: 'HTML' }
      );
    }
  }
  return next();
});

if (config.debug) {
  bot.on('message', (context, next) => {
    const { message } = context;
    debug('message', message);
    // const body = JSON.stringify(message, null, 2);
    // eslint-disable-next-line @typescript-eslint/camelcase
    // context.reply(body, { reply_to_message_id: message?.message_id });
    next();
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
bot.catch((error: any) => {
  console.error(error);
});

export default bot;
