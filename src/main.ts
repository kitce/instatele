import bot from './bot';
import job, { schedule } from './job';

(async () => {
  try {
    await bot.launch();
    console.info('Bot started as', bot.options.username);
    job.start();
    console.info('Cron Job started with', schedule);
  } catch (err) {
    console.error(err);
  }
})();
