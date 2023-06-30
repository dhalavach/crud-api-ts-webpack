import * as fs from 'fs/promises';
// import * as fs from 'node:fs/promises';

import { Http2ServerRequest } from 'http2';
// @ts-ignore TS6133
import { userData } from './types.ts';

export const getPostData = async (req: Http2ServerRequest): Promise<string> => {
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

export const checkIfRequiredFieldsArePresent = (userInfo: userData) => {
  if (userInfo.username && userInfo.age && userInfo.hobbies) return true;
  else return false;
};

export const parseArg = (arg: string) => {
  const PREFIX = '--';
  let props = {};

  for (let i = 2; i < process.argv.length; i++) {
    let arg = process.argv[i];

    if (arg.startsWith(PREFIX)) {
      let propName = arg.slice(2);
      let propValue = process.argv[i + 1];
      //@ts-ignore
      props[propName] = propValue;
      i++;
    }
  }
  //@ts-ignore
  return props[arg];
};
