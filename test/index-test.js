import chai from 'chai';
import dirtyChai from 'dirty-chai';

chai.should();
chai.use(dirtyChai);

describe('index', () => {
  it('should do anything', () => {
    'foo'.should.equal('foo');
  });
});
