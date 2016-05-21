import 'babel-polyfill';

import chai from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import meal from '../../src/listener/meal';
import { botMock, controllerMock, messageMock, resetMocks } from '../controllermock';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

describe('meal', () => {
  afterEach(() => {
    resetMocks();
  });

  it('should fail on API errors', callback => {
    const api = nock('http://api.microsofttranslator.com')
      .get('/V2/Ajax.svc/Translate')
      .query(true)
      .reply(200, '\ufeff"ArgumentException:"');
    meal(controllerMock, 'foo', 'bar', () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'meal',
          ['direct_message', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.botkit.log.error.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          "Can't get a translation :-("
        );
        callback();
      } catch (e) {
        callback(e);
      } finally {
        api.done();
      }
    });
  });

  it('should get a translation', callback => {
    const api = nock('http://api.microsofttranslator.com')
      .get('/V2/Ajax.svc/Translate')
      .query(true)
      .reply(200, '\ufeff"Mahlzeit"');
    meal(controllerMock, 'foo', 'bar', () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'meal',
          ['direct_message', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          sinon.match.string
        );
        botMock.reply.firstCall.args[1].should.contain('Mahlzeit (translated to');
        callback();
      } catch (e) {
        callback(e);
      } finally {
        api.done();
      }
    });
  });
});
