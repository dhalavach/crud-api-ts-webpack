import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: ['/node_modules', '/src/tests/'],
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],

  output: {
    filename: 'bundle.cjs',
    path: resolve(__dirname, 'dist'),
  },
  devServer: {
    static: join(__dirname, 'dist'),
    compress: true,
    port: 4000,
  },
};
