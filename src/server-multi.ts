import * as http from 'http';
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
import { parseArg } from './helpers.js';

export const server = async () => {
  const port = parseArg('port') || process.env.PORT || 5000;
  console.log(`process with ${process.pid} has started`);
  const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
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
    }
  );
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  const echoInput = (chunk: Buffer) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
  };

  process.stdin.on('data', echoInput);
};

server();
