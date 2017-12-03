const sinon = require('sinon');
const lolex = require('lolex');

const TIMESTAMP = 233550000000;
const formatDate = (d) =>
  `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
const timerFn = function (cb) {
  setTimeout(cb, 100);
};

let clock;

describe('sinon .useFakeTimers', () => {
  it('fake Date', () => {
    clock = sinon.useFakeTimers({
      now: new Date(TIMESTAMP)
    });

    expect(formatDate(new Date())).toEqual('27/5/1977');

    clock.restore();
  });

  it('fake nextTick', () => {
    clock = sinon.useFakeTimers({
      toFake: [ 'nextTick' ]
    });

    let called = false;

    process.nextTick(function () {
      called = true;
    });

    clock.runAll(); //forces nextTick calls to flush synchronously

    expect(called).toBeTruthy();

    clock.restore();
  });

  it('fake tick', () => {
    let result = '';

    clock = sinon.useFakeTimers();

    setImmediate(function () {
      result = 'tick';
    });

    setTimeout(function () {
      result = 'tock';
    }, 15);

    setTimeout(function () {
      result = 'tack';
    }, 35);

    expect(result).toEqual('');
    clock.tick();
    expect(result).toEqual('tick');
    clock.tick(15);
    expect(result).toEqual('tock');
    clock.tick(20)
    expect(result).toEqual('tack');
  });
});


describe('lolex (to provide timer API for Jest)', function () {
  it('mock the Date', function () {
    clock = lolex.install({
      now: TIMESTAMP
    });

    expect(formatDate(new Date())).toEqual('27/5/1977');

    clock.uninstall();
  });

  it('fake nextTick', () => {
    clock = lolex.install({
      toFake: [ 'nextTick' ]
    });

    let called = false;

    process.nextTick(function () {
      called = true;
    });

    clock.runAll(); //forces nextTick calls to flush synchronously

    expect(called).toBeTruthy();

    clock.uninstall();
  });

  it('fake tick', () => {
    let result = '';

    clock = lolex.install();

    setImmediate(function () {
      result = 'tick';
    });

    setTimeout(function () {
      result = 'tock';
    }, 15);

    setTimeout(function () {
      result = 'tack';
    }, 35);

    expect(result).toEqual('');
    clock.tick();
    expect(result).toEqual('tick');
    clock.tick(15);
    expect(result).toEqual('tock');
    clock.tick(20)
    expect(result).toEqual('tack');

    clock.uninstall();
  })
});
