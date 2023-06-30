import * as http from 'http';
import { Worker } from 'worker_threads';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import { spawn, exec, execFile, fork } from 'child_process';
//@ts-ignore
import { server } from './server.ts';

//@ts-ignore
import { parseArg } from './helpers.ts';
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
import { balancer } from './load-balancer/balancer.js';

const maxThreads = cpus().length - 1; //availableParallelism is not used due to limited support
const multithreaded = parseArg('multi');

if (multithreaded === 'true') {
  const spawnChildProcess = (arg: any) => {
    const child = fork('./src/server-multi.ts', ['--port', `${arg}`], {
      silent: true,
    });
    console.log('spawned a child process');

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.stdout.on('data', (chunk) => {
      process.stdout.write(`Received from child process: ${chunk}`);
    });
  };

  let port;
  for (let i = 0; i < maxThreads; i++) {
    port = 4001 + i;
    spawnChildProcess(port);
  }
} else {
  server();
}
