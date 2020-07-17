import config from './config/config';
import bot, { fetching, broadcast } from './bot';
import cron from './helpers/cron.helper';

const { schedule } = config;

(async () => {
  try {

    console.info('Fetching posts...');
    const posts = await fetching;
    console.info('Fetched', posts.length, 'posts');

    await bot.launch();
    console.info('Bot started as', bot.options.username);

    if (schedule) {
      const job = cron(schedule, broadcast);
      job.start();
      console.info('Cron Job started with', schedule);
    }

  } catch (err) {
    console.error(err);
  }
})();
