import fs from 'fs';
import sample from 'lodash/sample';
import url from 'url';
import util from 'util';

export default function (controller, readCallback = () => {}) {
  const types = ['ambient', 'direct_message', 'direct_mention', 'mention'];
  controller.hears('taunt', types, (bot, message) => {
    const [, name] = message.text.split(' ');
    const jokesPath = url.resolve(__dirname, 'assets/mother_jokes.txt');
    fs.readFile(jokesPath, 'utf8', (err, data) => {
      if (err) {
        bot.botkit.log.error("Can't read jokes", err);
        bot.reply(message, "Can't read jokes");
        readCallback(err);
        return;
      }
      const randomJoke = sample(data.trim().split('\n'));
      const placeholder = name ? `${name}'s'` : 'Deine';
      bot.reply(message, util.format(randomJoke, placeholder));
      readCallback();
    });
  });
}
