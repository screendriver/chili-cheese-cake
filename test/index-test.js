import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

import Bot from '../src/bot';
import { deleteToken, setToken } from './setup';
import { hasToken } from '../src/index';

chai.should();
chai.use(sinonChai);
chai.use(dirtyChai);

describe('index', function indexTest() {
  before(() => {
    this.bot = new Bot();
  });

  after(() => {
    this.bot.start.restore();
    setToken();
  });

  it('should call Bot#start when token was set', () => {
    this.bot.start.should.have.callCount(1);
  });

  it('should return true when token was set', () => {
    hasToken().should.be.true();
  });

  it('should return false when token was not set', () => {
    deleteToken();
    hasToken().should.be.false();
  });
});
