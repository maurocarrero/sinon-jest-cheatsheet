const sinon = require('sinon');

function formatDate(d) {
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

let clock;

describe('sinon.useFakeTimers', function () {
  beforeAll(function () {
    clock = sinon.useFakeTimers({
      now: new Date(233550000000)
    });
  });

  afterAll(function () {
    clock.restore();
  })

  it('defining Date.now in a specific date', () => {
    const d = new Date();

    expect(formatDate(d)).toEqual('27/5/1977');
  });
});
