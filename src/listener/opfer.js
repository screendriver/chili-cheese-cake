export default function (controller) {
  const types = ['direct_message', 'direct_mention', 'mention'];
  controller.hears(['opfer', 'opfa'], types, (bot, message) => {
    bot.reply(message, 'Du Opfer!');
  });
}
