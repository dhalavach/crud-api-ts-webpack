// import process from 'process';
//@ts-ignore
import { server } from './server.ts';
//@ts-ignore
import { balancer } from './load-balancer/balancer.ts';
//@ts-ignore
import { parseArg } from './helpers.ts';
import { config } from 'dotenv';
config();
const multithreaded = parseArg('multi');
const port = parseInt(process.env.PORT) || 5000;

if (multithreaded === 'true') {
  balancer(port);
} else {
  server(port);
}
