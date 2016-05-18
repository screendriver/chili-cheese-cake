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
      rimrafPromise('foo'),
    ])
  );

  it('should accept a store location', callback => {
    startBot('foo', false);
    fs.stat('./foo', (err, stats) => {
      stats.isDirectory().should.be.true();
      callback(err);
    });
  });
});
