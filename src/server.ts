import * as http from 'http';
import 'dotenv/config.js';
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

export const server = async () => {
  const port = parseArg('port') || 5000;
  const server = http.createServer(
    (req: http.IncomingMessage, res: http.ServerResponse) => {
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
    }
  );
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};
