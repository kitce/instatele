import debugFactory from 'debug';
import { readFile, writeFile } from 'fs/promises';
import scrape, { IPost, Type } from '../libs/instagram-posts';

const debug = debugFactory('instatele:helper:instagram');

const getFromLocal = async (username: string) => {
  try {
    debug('getFromLocal', username);
    const buffer = await readFile(`./data/${username}.json`);
    const json = buffer.toString();
    const posts = JSON.parse(json) as IPost[];
    debug('local', posts.length);
    return posts;
  } catch (err) {
    debug('getFromLocal err', err);
    return [];
  }
};

const fetch = async (username: string, count: number) => {
  debug('fetch', username);
  const posts = await scrape(username, { count });
  debug('fetched', posts.length);
  const json = JSON.stringify(posts);
  await writeFile(`./cache/${username}.json`, json);
  return posts;
};

const fetcher = async (username: string, count: number, interval: number) => {
  let posts = await getFromLocal(username);
  const attempt = async () => {
    try {
      posts = await fetch(username, count);
    } catch (err) {
      debug(`attempt failed, retry after ${interval}ms`);
    }
    setTimeout(attempt, interval);
  };
  await attempt();
  return () => posts;
};

export default fetcher;

export { Type };
