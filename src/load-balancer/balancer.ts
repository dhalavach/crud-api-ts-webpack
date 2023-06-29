import * as http from 'http';
import { getPostData as getBodyData } from '../helpers.js';
import cluster from 'cluster';
export const balancer = async (req: any, res: any) => {
  const servers = [
    `http://localhost:${process.env.PORT + 1}`,
    `http://localhost:${process.env.PORT + 2}`,
  ];
  let currentServerIndex = 0;
  let server;
  // const bodyData = await getBodyData(req)
  const { method, url, headers, body: body } = req;

  server = servers[currentServerIndex];
  currentServerIndex === servers.length - 1
    ? (currentServerIndex = 0)
    : currentServerIndex++;

  try {
    const response = http.get({
      hostname: server,
      method: method,
      headers: headers,
    });
    res.send(response);
  } catch (err) {
    console.log(err);
  }
};
