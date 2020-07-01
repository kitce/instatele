enum Type {
  Image = 'image',
  Video = 'video'
}

export interface IPost {
  id: string;
  username: string;
  time: number;
  type: Type;
  likes: number;
  comments: number;
  text: string;
  medias: {
    type: string;
    media: string;
  }[];
  url: string;
}

interface IOptions {
  count?: number;
  filter?: (post: IPost) => boolean;
}

export default function scrape (username: string, options?: IOptions): Promise<IPost[]>;
