import 'babel-polyfill';

import chai from 'chai';
import dirtyChai from 'dirty-chai';
import nock from 'nock';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import chuck from '../../src/listener/chuck';
import { botMock, controllerMock, messageMock, resetMocks } from '../controllermock';

chai.should();
chai.use(dirtyChai);
chai.use(sinonChai);

describe('chuck', () => {
  afterEach(() => {
    resetMocks();
  });

  it('should complain when lastName was not set', () => {
    messageMock.text = 'chuck firstname';
    chuck(controllerMock);
    controllerMock.hears.should.have.been.calledWith(
      'chuck',
      ['ambient', 'direct_mention', 'mention'],
      sinon.match.func
    );
    botMock.reply.should.have.been.calledOnce();
    botMock.reply.should.have.been.calledWith(
      messageMock,
      'You must append a firstname *and* a lastname'
    );
  });

  it('should add firstName and lastName to querystring', callback => {
    const api = nock('http://api.icndb.com')
      .get('/jokes/random')
      .query({ firstName: 'me', lastName: 'you' })
      .reply(200, {
        value: {
          joke: 'i am the joke',
        },
      });
    messageMock.text = 'chuck me you';
    chuck(controllerMock, () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'chuck',
          ['ambient', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          'i am the joke'
        );
        api.done();
        callback();
      } catch (e) {
        callback(e);
      }
    });
  });

  it('should get a joke without first and lastname', callback => {
    const api = nock('http://api.icndb.com')
      .get('/jokes/random')
      .reply(200, {
        value: {
          joke: 'i am the joke',
        },
      });
    messageMock.text = 'chuck';
    chuck(controllerMock, () => {
      try {
        controllerMock.hears.should.have.been.calledWith(
          'chuck',
          ['ambient', 'direct_mention', 'mention'],
          sinon.match.func
        );
        botMock.reply.should.have.been.calledOnce();
        botMock.reply.should.have.been.calledWith(
          messageMock,
          'i am the joke'
        );
        api.done();
        callback();
      } catch (e) {
        callback(e);
      }
    });
  });
});
