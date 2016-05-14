import Botkit from 'botkit';

class Bot {
  constructor(storePath) {
    this.controller = Botkit.slackbot({
      json_file_store: storePath,
      debug: true,
    });
  }

  start() {
    this.controller.spawn({
      token: process.env.token,
    }).startRTM();
  }
}

export default Bot;
