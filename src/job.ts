import config from './config/config';
import { CronJob } from 'cron';
// import debugFactory from 'debug';
import { broadcast } from './bot';

const { schedule } = config;

// const debug = debugFactory('hydreminder:job');

const job = new CronJob(schedule, broadcast);

export default job;

export { schedule };
