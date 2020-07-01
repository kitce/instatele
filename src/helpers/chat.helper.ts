import config from '../config/config';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

export const getChats = async (): Promise<string[]> => {
  const buffer = await readFile(config.files.chats);
  const json = buffer.toString() || '[]';
  const chats = JSON.parse(json);
  return chats;
};

const saveChats = (chats: string[]) => {
  const json = JSON.stringify(chats);
  return writeFile(config.files.chats, json);
};

export const joinChat = async (id: string | number) => {
  const chats = await getChats();
  const _id = id.toString();
  if (!chats.includes(_id)) {
    chats.push(_id);
    await saveChats(chats);
  }
};

export const leaveChat = async (id: string | number) => {
  const chats = await getChats();
  const _id = id.toString();
  const index = chats.indexOf(_id);
  if (index >= 0) {
    chats.splice(index, 1);
    await saveChats(chats);
  }
};
