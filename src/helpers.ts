import {writeFile} from 'fs/promises';
// import { promises as fs } from "fs";

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
  await writeFile(name, JSON.stringify(data), 'utf8');
};

export const checkIfRequiredFieldsArePresent = (userInfo: userData) => {
  if (userInfo.username && userInfo.age && userInfo.hobbies) return true;
  else return false;
};
