import chai from 'chai';
import dirtyChai from 'dirty-chai';
import fs from 'fs';
import rimrafPromise from 'rimraf-promise';

import Bot from '../src/bot';

chai.should();
chai.use(dirtyChai);

describe('bot', function botTest() {
  beforeEach(() => {
    this.bot = new Bot();
  });

  after(() =>
    Promise.all([
      rimrafPromise('store'),
      rimrafPromise('foo'),
    ])
  );

  describe('#constructor', () => {
    it('has default store location pointing to ./store', callback => {
      fs.stat('./store', (err, stats) => {
        stats.isDirectory().should.be.true();
        callback(err);
      });
    });

    it('should accept a different store location', callback => {
      this.bot = new Bot('foo');
      fs.stat('./foo', (err, stats) => {
        stats.isDirectory().should.be.true();
        callback(err);
      });
    });
  });

  describe('#start', () => {
    it('should start', () => {
      this.bot.start();
    });
  });
});
