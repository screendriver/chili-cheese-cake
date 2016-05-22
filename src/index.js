import 'babel-polyfill';

import chalk from 'chalk';
import url from 'url';
import winston from 'winston';

import { startBot } from './bot';

winston.add(winston.transports.File, { filename: url.resolve(__dirname, 'dist/botlog.log') });

if (!process.env.token) {
  winston.error(chalk.red('Specify token in environment'));
} else if (!process.env.transClientId) {
  winston.error(chalk.red('Error: Specify a transClientId in environment'));
} else if (!process.env.transClientSec) {
  winston.error(chalk.red('Error: Specify transClientSec in environment'));
} else {
  const storePath = process.env.storePath || url.resolve(__dirname, 'dist/store');
  const debug = process.env.debug || false;
  startBot(storePath, debug, process.env.transClientId, process.env.transClientSec);
}
