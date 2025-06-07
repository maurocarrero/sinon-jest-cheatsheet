// timers.test.js

// Polyfill para setImmediate en entorno jsdom
if (typeof setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

const sinon = require('sinon');
const fakeTimers = require('@sinonjs/fake-timers');

const TIMESTAMP = 233550000000;
const formatDate = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

describe('sinon .useFakeTimers', () => {
  let clock;
  afterEach(() => {
    if (clock) {
      clock.restore();
      clock = null;
    }
  });

  it('fake Date', () => {
    clock = sinon.useFakeTimers({ now: new Date(TIMESTAMP) });
    expect(formatDate(new Date())).toEqual('27/5/1977');
  });

  it('fake nextTick', () => {
    clock = sinon.useFakeTimers({ toFake: ['nextTick'] });

    let called = false;
    process.nextTick(() => { called = true; });

    clock.runAll();
    expect(called).toBeTruthy();
  });

  it('fake tick', () => {
    let result = '';
    clock = sinon.useFakeTimers();

    setImmediate(() => { result = 'tick'; });
    setTimeout(() => { result = 'tock'; }, 15);
    setTimeout(() => { result = 'tack'; }, 35);

    expect(result).toEqual('');
    clock.tick();
    expect(result).toEqual('tick');
    clock.tick(15);
    expect(result).toEqual('tock');
    clock.tick(20);
    expect(result).toEqual('tack');
  });
});

describe('jest .fakeTimers', () => {
  const innerSpy = jest.fn();
  const callback = jest.fn().mockImplementation(() => {
    return setTimeout(innerSpy, 200);
  });
  let timeout;

  beforeAll(() => {
    jest.useFakeTimers();
  });
  beforeEach(() => {
    timeout = setTimeout(callback, 100);
  });
  afterEach(() => {
    callback.mockClear();
    innerSpy.mockClear();
    clearTimeout(timeout);
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it('setTimeout is NOT a mock function', () => {
    expect(setTimeout.mock).toBeUndefined();
  });

  it('.runAllTimers', () => {
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback.mock.calls.length).toEqual(1);
    expect(innerSpy.mock.calls.length).toEqual(1);
  });

  it('.runOnlyPendingTimers', () => {
    jest.runOnlyPendingTimers();
    expect(callback.mock.calls.length).toEqual(1);
    expect(innerSpy.mock.calls.length).toEqual(0);
    jest.runOnlyPendingTimers();
    expect(innerSpy.mock.calls.length).toEqual(1);
  });

  it('.advanceTimersByTime', () => {
    jest.advanceTimersByTime(100);
    expect(callback.mock.calls.length).toEqual(1);
    expect(innerSpy.mock.calls.length).toEqual(0);
    jest.advanceTimersByTime(200);
    expect(innerSpy.mock.calls.length).toEqual(1);
  });
});

describe('fakeTimers.install (replacement de lolex)', () => {
  let clock;
  afterEach(() => {
    if (clock) {
      clock.uninstall();
      clock = null;
    }
  });

  it('mock the Date', () => {
    clock = fakeTimers.install({ now: TIMESTAMP });
    expect(formatDate(new Date())).toEqual('27/5/1977');
  });

  it('fake nextTick', () => {
    clock = fakeTimers.install({ toFake: ['nextTick'] });
    const spy = jest.fn();
    process.nextTick(spy);
    clock.runAll();
    expect(spy).toHaveBeenCalled();
  });

  it('fake tick', () => {
    let result = '';
    clock = fakeTimers.install();

    setImmediate(() => { result = 'tick'; });
    setTimeout(() => { result = 'tock'; }, 15);
    setTimeout(() => { result = 'tack'; }, 35);

    expect(result).toEqual('');
    clock.tick();
    expect(result).toEqual('tick');
    clock.tick(15);
    expect(result).toEqual('tock');
    clock.tick(20);
    expect(result).toEqual('tack');
  });
});
