import logger from 'winston';
import Botkit from 'botkit';

import chuck from './listener/chuck';
import joke from './listener/joke';
import meal from './listener/meal';
import taunt from './listener/taunt';

export function startBot(storePath, debug, transClientId, transClientSec) {
  logger.info('Starting bot');
  const controller = Botkit.slackbot({
    json_file_store: storePath,
    debug,
    logger,
  });
  controller.spawn({
    token: process.env.token,
    retry: 10,
  }).startRTM();
  chuck(controller);
  taunt(controller);
  meal(controller, transClientId, transClientSec);
  joke(controller);
}
