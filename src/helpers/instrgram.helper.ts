import debugFactory from 'debug';
import scrape from 'instagram-posts';

const debug = debugFactory('instatele:helper:instagram');

export const getPosts = async (username: string) => {
  debug('fetching', username);
  const posts = await scrape(username, { count: 999 });
  debug('fetched', posts.length);
  return posts;
};
