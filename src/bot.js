import Botkit from 'botkit';

import chuck from './listener/chuck';
import meal from './listener/meal';
import taunt from './listener/taunt';

export function startBot(storePath, debug, transClientId, transClientSec) {
  const controller = Botkit.slackbot({
    json_file_store: storePath,
    debug,
  });
  controller.spawn({
    token: process.env.token,
  }).startRTM();
  chuck(controller);
  taunt(controller);
  meal(controller, transClientId, transClientSec);
}
