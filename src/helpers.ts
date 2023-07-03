import * as fs from 'fs/promises';
// @ts-ignore TS6133
import { userData } from './types.ts';
import { IncomingMessage } from 'http';

export const getPostData = async (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const writeToFile = async (name: any, data: any) => {
  await fs.writeFile(name, JSON.stringify(data), 'utf8');
};

export const readFromFile = async (filePath: any) => {
  const result = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(result);
};

export const checkIfRequiredFieldsArePresent = (
  userInfo: userData
): boolean => {
  if (
    typeof userInfo.username === 'string' &&
    typeof userInfo.age === 'number' &&
    Array.isArray(userInfo.hobbies) &&
    userInfo.hobbies.every((val) => typeof val === 'string')
  ) {
    return true;
  } else {
    return false;
  }
};

export const parseArg = (arg: string) => {
  const PREFIX = '--';
  const props = new Map();

  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i];

    if (arg.startsWith(PREFIX)) {
      const propName = arg.slice(2);
      const propValue = process.argv[i + 1];
      props.set(propName, propValue);
      i++;
    }
  }
  return props.get(arg);
};
