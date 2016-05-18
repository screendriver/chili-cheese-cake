import 'babel-polyfill';

import chalk from 'chalk';

import { startBot } from './bot';

if (!process.env.token) {
  console.error(chalk.red('Error: Specify token in environment'));
  process.exit(1);
}

const storePath = process.env.storePath || './dist/store';
const debug = process.env.debug || false;
startBot(storePath, debug);
