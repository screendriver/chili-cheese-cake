import 'babel-polyfill';

import chalk from 'chalk';

import Bot from './bot';

if (!process.env.token) {
  console.error(chalk.red('Error: Specify token in environment'));
  process.exit(1);
}
const storePath = process.env.storePath || 'store';
new Bot(storePath).start();
