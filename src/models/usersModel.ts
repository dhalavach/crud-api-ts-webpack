// import users from './../mock-data/users.json' assert { type: 'json' };
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

// const users = [
//   {
//     id: '01H3Y5M8KQ4CQYGFWDTWBKZMQ3',
//     username: 'Maureen',
//     age: 65,
//     hobbies: ['boxing', 'drinking in bars'],
//   },
//   {
//     id: '01H3Y5M8KRGCSTMJVGWA339JQ8',
//     username: 'Karlyn',
//     age: 97,
//     hobbies: ['matchbox collecting'],
//   },
//   {
//     id: '01H3Y5M8KSX4R8BHEDXA5DN2E4',
//     username: 'Linus',
//     age: 53,
//     hobbies: [
//       'functional programming',
//       'compiler design',
//       'Linux kernel development',
//     ],
//   },
//   {
//     id: '01H3Y5M8KT2C8T4EMJYTNH03DF',
//     username: 'Mohammed',
//     age: 17,
//     hobbies: ['flying', 'DIY', 'travelling'],
//   },
//   {
//     id: '01H3Y5M8KV5SZV0VBCZCH0N2SE',
//     username: 'Joann',
//     age: 59,
//     hobbies: ['artisanal bread baking'],
//   },
//   {
//     id: '01H3Y5M8KVXGZTAMG2S0GCZFQV',
//     username: 'Sandor',
//     age: 82,
//     hobbies: ['hanging out with fellow WW2 veterans'],
//   },
//   {
//     id: '01H3Y5M8KWEZPT42D85M67MS2E',
//     username: 'Tobiah',
//     age: 12,
//     hobbies: ['Dark Souls', 'dota', 'Starcraft'],
//   },
//   {
//     id: '01H3Y5M8KW9SZ39Y3JAEH25GF2',
//     username: 'Joe',
//     age: 80,
//     hobbies: ['running for president'],
//   },
//   {
//     id: '01H3Y5M8KX4MQBS96W20SZ3P99',
//     username: 'Leo',
//     age: 41,
//     hobbies: ['writing', 'literature'],
//   },
//   {
//     id: '01H3Y5M8KY9S506WCKXNRWCHR9',
//     username: 'Darrelle',
//     age: 49,
//     hobbies: ['kickboxing'],
//   },
//   {
//     id: '01H3Y5M8KY5J1HBCM2N6GPP96V',
//     username: 'Waldemar',
//     age: 21,
//     hobbies: ['Witcher 3', 'streaming'],
//   },
//   {
//     id: '01H3Y5M8KZSMCHJ35ZJC4F2XHY',
//     username: 'Catha',
//     age: 28,
//     hobbies: ['fashion designer', 'model'],
//   },
//   {
//     id: '01H3Y5M8KZ0Z8ETNDND7MV9KVK',
//     username: 'Neil',
//     age: 14,
//     hobbies: ['piano'],
//   },
//   {
//     id: '01H3Y5M8M0S7F71ZJB24MVQFCC',
//     username: 'Gareth',
//     age: 44,
//     hobbies: ['gardening'],
//   },
//   {
//     id: '01H3Y5M8M1W547ETWSKWS9WJ0X',
//     username: 'Dorris',
//     age: 74,
//     hobbies: ['skydiving'],
//   },
//   {
//     id: '01H3Y5M8M1EMHH7J09A7DJXNJX',
//     username: 'Lex',
//     age: 36,
//     hobbies: ['podcasting'],
//   },
//   {
//     id: '01H3Y5M8M2C67149F5F307M78T',
//     username: 'Daniele',
//     age: 44,
//     hobbies: [],
//   },
//   {
//     id: '01H3Y5M8M2B4ZF4JPY4PMYEXKY',
//     username: 'Inglis',
//     age: 74,
//     hobbies: ['foreign languages'],
//   },
//   {
//     id: 'cdc82f7f-be13-413b-92d5-0446c228973d',
//     username: 'Karl',
//     age: 50,
//     hobbies: ['stock market speculation'],
//   },
//   {
//     id: 'e5d6d4d5-687c-499d-b88a-2a15007d328c',
//     username: 'jane',
//     age: 25,
//     hobbies: ['swimming'],
//   },
//   {
//     id: 'b6b3f0ab-4ef5-4240-a947-dc41778f32a0',
//     username: 'jane',
//     age: 25,
//     hobbies: ['swimming'],
//   },
//   {
//     id: 'b692d879-0f49-4d4a-ad82-e3262729c852',
//     username: 'jane doe',
//     age: 35,
//     hobbies: ['swimming'],
//   },
// ];
