import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import opfer from '../../src/listener/opfer';
import { botMock, controllerMock, messageMock, resetMocks } from '../controllermock';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

describe('opfer', () => {
  afterEach(() => {
    resetMocks();
  });

  it('should reply to opfer or opfa', () => {
    opfer(controllerMock);
    controllerMock.hears.should.have.been.calledWith(
      ['opfer', 'opfa'],
      ['direct_message', 'direct_mention', 'mention'],
      sinon.match.func
    );
    botMock.reply.should.have.been.calledOnce();
    botMock.reply.should.have.been.calledWith(
      messageMock,
      sinon.match.string
    );
    const replied = botMock.reply.firstCall.args[1];
    replied.should.equal('Du Opfer!');
  });
});
