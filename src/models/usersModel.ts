import { uuid } from 'uuidv4';
// @ts-ignore TS6133
import { readFromFile, writeToFile } from '../helpers.ts';
// @ts-ignore TS6133
import { userData, user } from '../types.ts';

export const getAllUsers = async () => {
  const users = await readFromFile('./src/mock-data/users.json');
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUserById = async (id: string) => {
  const users = await readFromFile('./src/mock-data/users.json');
  return new Promise((resolve) => {
    //@ts-ignore
    const user = users.find((user: userData) => user.id === id);
    resolve(user);
  });
};

export const create = async (user: userData): Promise<user | undefined> => {
  const users = await readFromFile('./src/mock-data/users.json');

  return new Promise((resolve) => {
    const newUser = { id: uuid(), ...user };
    //@ts-ignore
    users.push(newUser);
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', users);
    }
    resolve(newUser);
  });
};

export const update = async (id: string, data: userData) => {
  const users = await readFromFile('./src/mock-data/users.json');

  return new Promise((resolve) => {
    //@ts-ignore
    const userIndex = users.findIndex((user) => user.id === id);
    //@ts-ignore
    users[userIndex] = { id, ...data };
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', users);
    }
    //@ts-ignore
    resolve(users[userIndex]);
  });
};

export const remove = async (id: string): Promise<void> => {
  const users = await readFromFile('./src/mock-data/users.json');

  return new Promise((resolve) => {
    //@ts-ignore
    const newUsers = users.filter((user) => user.id !== id);
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', newUsers);
    }
    resolve();
  });
};
