export default function (controller, repliedCallback = () => {}) {
  const types = ['direct_message', 'direct_mention', 'mention'];
  controller.hears(['opfer', 'opfa'], types, (bot, message) => {
    bot.reply(message, 'Du Opfer!');
    repliedCallback();
  });
}
