import chai from 'chai';
import dirtyChai from 'dirty-chai';
import fs from 'fs';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import taunt from '../../src/listener/taunt';
import { botMock, controllerMock, messageMock, resetMocks } from '../controllermock';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

describe('taunt', () => {
  afterEach(() => {
    resetMocks();
  });

  it('should fail on file system error', () => {
    const readFile = sinon.stub(fs, 'readFile');
    try {
      const error = new Error('failed');
      readFile.callsArgWith(2, error);
      taunt(controllerMock);
      botMock.botkit.log.error.should.have.been.called();
      botMock.reply.should.have.been.calledOnce();
      botMock.reply.should.have.been.calledWith(
        messageMock,
        "Can't read jokes"
      );
    } finally {
      readFile.restore();
    }
  });

  it("should taunt 'Deine'", callback => {
    taunt(controllerMock, () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'taunt',
          ['ambient', 'direct_message', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          sinon.match.string
        );
        botMock.reply.firstCall.args[1].should.contain('Deine');
        callback();
      } catch (e) {
        callback(e);
      }
    });
  });

  it('should taunt a nickname', callback => {
    messageMock.text = 'taunt you';
    taunt(controllerMock, () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'taunt',
          ['ambient', 'direct_message', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          sinon.match.string
        );
        botMock.reply.firstCall.args[1].should.contain('you');
        callback();
      } catch (e) {
        callback(e);
      }
    });
  });
});
