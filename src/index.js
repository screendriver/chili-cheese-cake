import 'babel-polyfill';

import chalk from 'chalk';

import { startBot } from './bot';

if (!process.env.token) {
  console.error(chalk.red('Error: Specify token in environment'));
  process.exit(1);
}
const storePath = process.env.storePath || 'store';
startBot(storePath);
