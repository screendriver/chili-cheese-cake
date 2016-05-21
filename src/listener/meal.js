import keys from 'lodash/keys';
import sample from 'lodash/sample';
import MsTranslator from 'mstranslator';

import langCodes from '../assets/lang-codes.json';

export default function (controller, transClientId, transClientSec,
    repliedCallback = () => {}) {
  const client = new MsTranslator({
    client_id: transClientId,
    client_secret: transClientSec,
  }, true);
  const types = ['direct_message', 'direct_mention', 'mention'];
  controller.hears('meal', types, (bot, message) => {
    const langCode = sample(keys(langCodes));
    const country = langCodes[langCode];
    const params = {
      text: 'Enjoy your meal',
      from: 'en',
      to: langCode,
    };
    client.translate(params, (err, data) => {
      if (err) {
        bot.botkit.log.error("Can't get a translation", err);
        bot.reply(message, "Can't get a translation :-(");
      } else {
        bot.reply(message, `${data} (translated to ${country})`);
      }
      repliedCallback();
    });
  });
}
