import users from '../mock-data/users.json' assert { type: 'json' };
import { uuid } from 'uuidv4';
// @ts-ignore TS6133
import { writeToFile } from '../helpers.ts';
// @ts-ignore TS6133
import { userData, user } from '../types.ts';

// const isUuid = (id: string) => {
//   return !!id;
// };

// const uuid = () => {
// return '12345'
// }

export const getAllUsers = () => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

export const getUserById = (id: string): Promise<user | undefined> => {
  return new Promise((resolve) => {
    const user = users.find((user: any) => user.id === id);
    resolve(user);
  });
};

export const create = (user: userData): Promise<user | undefined> => {
  return new Promise((resolve) => {
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', users);
    }
    resolve(newUser);
  });
};

export const update = (id: string, data: userData) => {
  return new Promise((resolve) => {
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = { id, ...data };
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', users);
    }
    resolve(users[userIndex]);
  });
};

export const remove = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const newUsers = users.filter((user) => user.id !== id);
    if (process.env.NODE_ENV !== 'test') {
      writeToFile('./src/mock-data/users.json', newUsers);
    }
    resolve();
  });
};
