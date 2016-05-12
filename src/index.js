import 'babel-polyfill';

import Botkit from 'botkit';

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

const controller = Botkit.slackbot({
  debug: true,
});

controller.spawn({
  token: process.env.token,
}).startRTM();

controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', (bot, message) => {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  }, err => {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(', err);
    }
  });
});
