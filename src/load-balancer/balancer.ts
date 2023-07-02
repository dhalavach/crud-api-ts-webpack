// not implemented correctly yet!

import * as http from 'http';
import { getPostData as getBodyData } from '../helpers.js';
import cluster from 'cluster';
import { cpus } from 'os';
export const balancer = async (req: any, res: any) => {
  const servers = [
    `http://localhost:4001`,
    `http://localhost:4002`,
    `http://localhost:4003`,
  ];
  let currentServerIndex = 0;
  let server;
  // const bodyData = await getBodyData(req)
  const { method, url, headers, body: data } = req;

  server = servers[currentServerIndex];
  currentServerIndex === servers.length - 1
    ? (currentServerIndex = 0)
    : currentServerIndex++;

  try {
    const response = http.get({
      hostname: server,
      method: method,
      headers: headers,
      //@ts-ignore
      body: data,
    });
    console.log(response);
    // res.send(response);
  } catch (err) {
    console.log(err);
  }
};
