import 'babel-polyfill';

import chalk from 'chalk';
import url from 'url';

import { startBot } from './bot';

if (!process.env.token) {
  console.error(chalk.red('Error: Specify token in environment'));
  process.exit(1);
}

if (!process.env.transClientId) {
  console.error(chalk.red('Error: Specify a transClientId in environment'));
  process.exit(1);
}

if (!process.env.transClientSec) {
  console.error(chalk.red('Error: Specify transClientSec in environment'));
  process.exit(1);
}

const storePath = process.env.storePath || url.resolve(__dirname, 'dist/store');
const debug = process.env.debug || false;
startBot(storePath, debug, process.env.transClientId, process.env.transClientSec);
