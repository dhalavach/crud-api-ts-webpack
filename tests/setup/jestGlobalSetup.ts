//@ts-ignore
import { server } from '../../src/server.ts';
export default async () => {
  server(parseInt(process.env.PORT) || 5000);
};
