import { CronJob, CronCommand } from 'cron';

const cron = (schedule: string, onTick: CronCommand) => {
  const job = new CronJob(schedule, onTick);
  return job;
};

export default cron;
