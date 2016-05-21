import sample from 'lodash/sample';

import jokes from '../assets/jokes.json';

export default function (controller, repliedCallback = () => {}) {
  const types = ['direct_message', 'direct_mention', 'mention'];
  controller.hears('joke', types, (bot, message) => {
    bot.reply(message, sample(jokes));
    repliedCallback();
  });
}
