import sinon from 'sinon';

const botMock = {
  reply: sinon.spy(),
  botkit: {
    log: {
      error: sinon.spy(),
    },
  },
};

const messageMock = {
  text: '',
};

const controllerMock = {
  hears: sinon.stub().callsArgWith(2, botMock, messageMock),
};

function resetMocks() {
  botMock.reply.reset();
  botMock.botkit.log.error.reset();
  messageMock.text = '';
  controllerMock.hears.reset();
}

export { botMock, messageMock, controllerMock, resetMocks };
