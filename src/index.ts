import { cpus } from 'os';
import process from 'process';
import { fork } from 'child_process';
//@ts-ignore
import { server } from './server.ts';
//@ts-ignore
import { parseArg } from './helpers.ts';
import 'dotenv/config.js';

const maxThreads = cpus().length - 1; //availableParallelism is not used due to limited support
const multithreaded = parseArg('multi');

if (multithreaded === 'true') {
  const spawnChildProcess = (arg: number | string) => {
    const child = fork('./src/server-multi.ts', ['--port', `${arg}`], {
      silent: true,
    });

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
