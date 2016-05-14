import sinon from 'sinon';

import Bot from '../src/bot';

sinon.stub(Bot.prototype, 'start');
process.env.storePath = 'dist/store';

export function setToken() {
  process.env.token = 'foo-token';
}

export function deleteToken() {
  delete process.env.token;
}

setToken();
