export default function (controller) {
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
    controller.storage.users.get(message.user, (err, user) => {
      if (user && user.name) {
        bot.reply(message, `Hello ${user.name}!!`);
      } else {
        bot.reply(message, 'Hello.');
      }
    });
  });
}
