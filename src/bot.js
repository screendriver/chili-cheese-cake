import Botkit from 'botkit';

import hello from './hears/hello';

export function startBot(storePath = './store') {
  const controller = Botkit.slackbot({
    json_file_store: storePath,
    debug: true,
  });
  controller.spawn({
    token: process.env.token,
  }).startRTM();
  hello(controller);
}
