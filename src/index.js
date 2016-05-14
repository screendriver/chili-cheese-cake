import 'babel-polyfill';

import chalk from 'chalk';

import Bot from './bot';

export function hasToken() {
  if (!process.env.token) {
    console.error(chalk.red('Error: Specify token in environment'));
    return false;
  }
  return true;
}

if (hasToken()) {
  const storePath = process.env.storePath || 'store';
  new Bot(storePath).start();
} else {
  process.exit(1);
}
