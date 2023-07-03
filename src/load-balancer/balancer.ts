import * as http from 'http';
import cluster from 'cluster';
//@ts-ignore
import { server } from './../server.ts';
import { cpus } from 'os';
export const balancer = (port: number) => {
  const maxWorkers = cpus().length - 1; //availableParallelism is not used due to limited support

  if (cluster.isPrimary) {
    process.on('uncaughtException', (err) => console.log(err));
    const workerPortArray = [];

    for (let i = 0; i < maxWorkers; i++) {
      const wp = port + 1 + i;
      cluster.fork({ WORKER_PORT: wp });
      workerPortArray.push(wp);
    }

    let nextServerIndex = 0;

    const balancerServer = http.createServer((request, response) => {
      nextServerIndex = (nextServerIndex % maxWorkers) + 1;
      const wp = port + nextServerIndex;
      try {
        const proxy = http.request(
          {
            hostname: 'localhost',
            port: wp,
            path: request.url,
            method: request.method,
            headers: request.headers,
          },
          (res) => {
            response.writeHead(
              res.statusCode ?? 200,
              res.statusMessage,
              res.headers
            );
            res.pipe(response);
          }
        );
        proxy.on('error', (err) => {
          console.log(err);
          request.unpipe(proxy);
        });
        request.pipe(proxy);
      } catch (err) {
        console.log(err);
      }
    });

    balancerServer.on('error', (err) => {
      console.log(err);
    });

    balancerServer.listen(port, () => {
      console.log(`balancer server is listening on ${port}`);
    });
  } else {
    const wtPort = parseInt(process.env.WORKER_PORT) || 4001;
    server(wtPort);
  }
};
