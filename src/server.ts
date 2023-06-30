import * as http from 'http';
// import { Worker } from 'worker_threads';
// import cluster from 'cluster';
// import { cpus } from 'os';
import process from 'process';
import 'dotenv/config.js';
// import users from './mock-data/users.json' assert { type: 'json' };
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  // @ts-ignore TS6133
} from './controllers/usersController.js';
//@ts-ignore
import { parseArg } from './helpers.ts';

export const server = async () => {
  // console.log(process.argv);
  const port = parseArg('port') || process.env.PORT;
  // const port = Number(process.argv[2]);
  console.log(`process with ${process.pid} has started`);
  const server = http.createServer((req: any, res: any) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (
      req.url?.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
      req.method === 'GET'
    ) {
      const userId = req.url.split('/')[4];
      getUser(res, userId);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (
      req.url?.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
      req.method === 'PUT'
    ) {
      const id = req.url.split('/')[4];
      updateUser(req, res, id);
    } else if (
      req.url?.match(/\/api\/users\/user\/[a-zA-Z0-9]+/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[4];
      deleteUser(res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Resource not found!' }));
    }
  });
  //@ts-ignore
  // let port = Math.floor(Math.random() * 10000);
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

server();
