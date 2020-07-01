import config from './config/config';
import bot, { fetching } from './bot';

(async () => {
  try {
    console.info(`Fetching posts from ${config.username}...`);
    const posts = (await fetching)();
    console.info('Fetched', posts.length, 'posts');
  } catch (err) {
    console.info('Failed to fetch posts');
    console.error(err);
  }
  await bot.launch({
    webhook: {
      domain: config.webhookURL,
      port: config.port
    }
  });
  const me = await bot.telegram.getMe();
  console.info('Bot started as', me.username);
})();
