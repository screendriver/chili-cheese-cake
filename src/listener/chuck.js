import requestPromise from 'request-promise';

export default function (controller, repliedCallback = () => {}) {
  const types = ['direct_message', 'direct_mention', 'mention'];
  controller.hears('chuck', types, async (bot, message) => {
    const [, firstName, lastName] = message.text.split(' ');
    const options = {
      url: 'http://api.icndb.com/jokes/random',
    };
    if (firstName && !lastName) {
      bot.reply(message, 'You must append a firstname *and* a lastname');
      return;
    }
    if (firstName && lastName) {
      options.qs = {
        firstName,
        lastName,
      };
    }
    try {
      const body = await requestPromise(options);
      bot.reply(message, JSON.parse(body).value.joke);
    } catch (e) {
      bot.botkit.log.error("Can't get a chuck norris joke", e);
      bot.reply(message, "Can't get a chuck norris joke :-(");
    } finally {
      repliedCallback();
    }
  });
}
