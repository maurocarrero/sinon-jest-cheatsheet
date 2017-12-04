const sinon = require('sinon');
const lolex = require('lolex');

const TIMESTAMP = 233550000000;

const formatDate = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

const timerFn = cb => setTimeout(cb, 100);

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
      toFake: ['nextTick']
    });

    let called = false;

    process.nextTick(function() {
      called = true;
    });

    clock.runAll(); //forces nextTick calls to flush synchronously

    expect(called).toBeTruthy();

    clock.restore();
  });

  it('fake tick', () => {
    let result = '';

    clock = sinon.useFakeTimers();

    setImmediate(function() {
      result = 'tick';
    });

    setTimeout(function() {
      result = 'tock';
    }, 15);

    setTimeout(function() {
      result = 'tack';
    }, 35);

    expect(result).toEqual('');
    clock.tick();
    expect(result).toEqual('tick');
    clock.tick(15);
    expect(result).toEqual('tock');
    clock.tick(20);
    expect(result).toEqual('tack');

    clock.restore();
  });
});

describe('jest', function() {
  describe('.fakeTimers', function() {
    const innerSpy = jest.fn();
    const callback = jest.fn().mockImplementation(() => {
      return setTimeout(innerSpy, 200);
    });
    let timeout;

    beforeAll(() => {
      // Enable fake timers
      jest.useFakeTimers();
    });

    beforeEach(() => {
      timeout = timerFn(callback);
    });

    afterEach(() => {
      callback.mockClear();
      innerSpy.mockClear();
      clearTimeout(timeout);
    });

    afterAll(() => {
      jest.clearAllTimers();
    });

    it('setTimeout is a mock function', function() {
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(100);
    });

    it('.runAllTimers', () => {
      expect(callback).not.toBeCalled();

      // Fast-forward until all timers have been executed
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

    it('.runTimersToTime | jest 22.0.0: .advanceTimersByTime', () => {
      jest.runTimersToTime(100);

      expect(callback.mock.calls.length).toEqual(1);
      expect(innerSpy.mock.calls.length).toEqual(0);

      jest.runTimersToTime(200);

      expect(innerSpy.mock.calls.length).toEqual(1);
    });
  });
  describe('lolex (to provide timer API for Jest)', function() {
    it('mock the Date', function() {
      clock = lolex.install({
        now: TIMESTAMP
      });

      expect(formatDate(new Date())).toEqual('27/5/1977');

      clock.uninstall();
    });

    it('fake nextTick', () => {
      clock = lolex.install({
        toFake: ['nextTick']
      });

      let spy = jest.fn();

      process.nextTick(spy);

      clock.runAll(); //forces nextTick calls to flush synchronously

      expect(spy).toHaveBeenCalled();

      clock.uninstall();
    });

    it('fake tick', () => {
      let result = '';

      clock = lolex.install();

      setImmediate(function() {
        result = 'tick';
      });

      setTimeout(function() {
        result = 'tock';
      }, 15);

      setTimeout(function() {
        result = 'tack';
      }, 35);

      expect(result).toEqual('');
      clock.tick();
      expect(result).toEqual('tick');
      clock.tick(15);
      expect(result).toEqual('tock');
      clock.tick(20);
      expect(result).toEqual('tack');

      clock.uninstall();
    });
  });
});
