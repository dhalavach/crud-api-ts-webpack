//@ts-ignore
import { server } from '../../src/server.ts';
export default async () => {
  console.log('\nhello, this is just before tests start running');
  server();
};
