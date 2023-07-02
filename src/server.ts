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
} from './controllers/usersController.ts';
//@ts-ignore
import { parseArg } from './helpers.ts';
import { parseArgs } from 'util';

export const server = async () => {
  // console.log(process.argv);
  const port = parseArg('port') || 5000;
  // const port = Number(process.argv[2]);
  // console.log(`process with ${process.pid} has started`);
  const server = http.createServer((req: any, res: any) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (
      req.url?.match(/\/api\/users\/[a-zA-Z0-9]+/) &&
      req.method === 'GET'
    ) {
      const userId = req.url.split('/')[3];
      getUser(res, userId);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      createUser(req, res);
    } else if (
      req.url?.match(/\/api\/users\/[a-zA-Z0-9]+/) &&
      req.method === 'PUT'
    ) {
      const id = req.url.split('/')[3];
      console.log('parsed put id: ' + id);
      updateUser(req, res, id);
    } else if (
      req.url?.match(/\/api\/users\/[a-zA-Z0-9]+/) &&
      req.method === 'DELETE'
    ) {
      const id = req.url.split('/')[3];
      console.log('parsed delete id: ' + id);

      deleteUser(res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Resource not found!' }));
    }
  });
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  // const echoInput = (chunk: any) => {
  //   const chunkStringified = chunk.toString();
  //   if (chunkStringified.includes('CLOSE')) process.exit(0);
  //   process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
  // };

  // process.stdin.on('data', echoInput);
};
