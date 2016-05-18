import Botkit from 'botkit';

import chuck from './listener/chuck';
import taunt from './listener/taunt';

export function startBot(storePath, debug) {
  const controller = Botkit.slackbot({
    json_file_store: storePath,
    debug,
  });
  controller.spawn({
    token: process.env.token,
  }).startRTM();
  chuck(controller);
  taunt(controller);
}
