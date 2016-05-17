import chai from 'chai';
import dirtyChai from 'dirty-chai';
import fs from 'fs';
import rimrafPromise from 'rimraf-promise';

import { startBot } from '../src/bot';

chai.should();
chai.use(dirtyChai);

describe('bot', () => {
  after(() =>
    Promise.all([
      rimrafPromise('store'),
      rimrafPromise('foo'),
    ])
  );

  it('has default store location pointing to ./store', callback => {
    startBot();
    fs.stat('./store', (err, stats) => {
      stats.isDirectory().should.be.true();
      callback(err);
    });
  });

  it('should accept a different store location', callback => {
    startBot('foo');
    fs.stat('./foo', (err, stats) => {
      stats.isDirectory().should.be.true();
      callback(err);
    });
  });
});
