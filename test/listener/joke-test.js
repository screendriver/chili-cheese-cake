import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import joke from '../../src/listener/joke';
import jokes from '../../src/assets/jokes.json';
import { botMock, controllerMock, messageMock, resetMocks } from '../controllermock';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

describe('joke', () => {
  afterEach(() => {
    resetMocks();
  });

  it('should get a random joke', () => {
    joke(controllerMock);
    controllerMock.hears.should.have.been.calledWith(
      'joke',
      ['direct_message', 'direct_mention', 'mention'],
      sinon.match.func
    );
    botMock.reply.should.have.been.calledOnce();
    botMock.reply.should.have.been.calledWith(
      messageMock,
      sinon.match.string
    );
    const replied = botMock.reply.firstCall.args[1];
    jokes.should.include(replied);
  });
});
