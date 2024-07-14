# Sinon # Jest (a cheatsheet).

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/KGvHWvXnzGS4FPUQXWKdAZ/SfzZ9zFtmW67xuFET6yjFZ/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/KGvHWvXnzGS4FPUQXWKdAZ/SfzZ9zFtmW67xuFET6yjFZ/tree/master)

Some examples on how to achieve the same goal with either of both libraries: [sinon](http://sinonjs.org/) and [jest](http://facebook.github.io/jest/).
Also some of those goals achievable only by one of these tools.

What's inside? just this **README** file and many **unit tests** using jest as runner.

###### Clone the repo:

```shell
git clone https://github.com/maurocarrero/sinon-jest-cheatsheet.git
```

###### Install:

```shell
npm install
```

###### Run tests:

```shell
npm test
```

or use watch

```shell
npm run test:watch
```

## Table of Contents

1. [Create Spies](#create-spies)
2. [Are they called?](#are-they-called)
3. [How many times?](#how-many-times)
4. [Checking arguments](#checking-arguments)
5. [Spy on objects methods](#spy-on-objects-method)
6. [Reset and Restore original method](#restore-original-method)
7. [Return value](#return-value)
8. [Custom implementation](#custom-implementation)
9. [Poking into React component methods](#react-component-methods)
10. [Timers](#timers)

##### [Jest specific](#jest-specific)

1. [Snapshot testing](#snapshot-testing)
2. [Automock](#automock)

<a name="spies"></a>

## Spies <a name="create-spies"></a>

While **sinon** uses three different terms for its snooping functions: `spy`, `stub` and `mock`,
**jest** uses mostly the term `mock function` for what'd be a spy/stub and `manual mock` or `mock` ...well, for mocks.

### 1. Create spies:

###### sinon

```js
const spy = sinon.spy();
```

###### jest

```js
const spy = jest.fn();
```

<a name="are-they-called"></a>

### 2. Know if they are called:

###### sinon

```js
spy.called; // boolean
spy.notCalled; // boolean
```

###### jest

```js
spy.mock.calls.length; // number;
```

```js
expect(spy).toHaveBeenCalled();
```

<a name="how-many-times"></a>

### 3. How many times are called:

###### sinon

```js
spy.calledOnce; // boolean
spy.calledTwice; // boolean
spy.calledThrice; // boolean
spy.callCount; // number
```

###### jest

```js
spy.mock.calls.length; // number;
```

```js
expect(spy).toHaveBeenCalledTimes(n);
```

<a name="checking-arguments"></a>

### 4. Checking arguments:

###### sinon

```js
// args[call][argIdx]
spy.args[0][0];
```

```jsjs
// spy.calledWith(...args)
spy.calledWith(1, 'Hey')
```

###### jest

```js
// mock.calls[call][argIdx]
spy.mock.calls[0][0];
```

```js
expect(spy).toHaveBeenCalledWith(1, 'Hey');
expect(spy).toHaveBeenLastCalledWith(1, 'Hey');
```

```js
.toHaveBeenCalledWith(expect.anything());
.toHaveBeenCalledWith(expect.any(constructor));
.toHaveBeenCalledWith(expect.arrayContaining([ values ]));
.toHaveBeenCalledWith(expect.objectContaining({ props }));
.toHaveBeenCalledWith(expect.stringContaining(string));
.toHaveBeenCalledWith(expect.stringMatching(regexp));
```

<a name="spy-on-objects-method"></a>

### 5. Spy on objects' methods

###### sinon

```js
sinon.spy(someObject, 'aMethod');
```

###### jest

```js
jest.spyOn(someObject, 'aMethod');
```

<a name="restore-original-method"></a>

### 6. Reset and Restore original method

###### sinon

reset both, history and behavior:

```js
stub.resetHistory();
```

reset call history:

```js
stub.resetHistory();
```

reset behaviour:

```js
stub.resetBehavior();
```

restore (remove mock):

```js
someObject.aMethod.restore();
```

###### jest

```js
someObject.aMethod.mockRestore();
```

<a name="return-value"></a>

### 7. Spy on method and return value:

###### sinon

```js
stub = sinon.stub(operations, 'add');
stub.returns(89);
```

```js
stub.withArgs(42).returns(89);
stub.withArgs(4, 9, 32).returns('OK');
```

On different calls:

```js
stub.onCall(1).returns(7);
expect(fn()).not.toEqual(7);
expect(fn()).toEqual(7);
```

###### jest

```js
jest.spyOn(operations, 'add').mockReturnValue(89);
```

On different calls:

```js
spy.mockReturnValueOnce(undefined);
spy.mockReturnValueOnce(7);

expect(fn()).not.toEqual(7);
expect(fn()).toEqual(7);
```

<a name="custom-implementation"></a>

### 8. Custom implementation:

###### sinon

```js
sinonStub.callsFake(function() {
  return 'Peteco';
});
expect(operations.add(1, 2)).toEqual('Peteco');
```

Different implementation on different call:

###### jest

```js
jest.spyOn(operations, 'add').mockImplementation(function(a, b, c) {
  if (a === 42) {
    return 89;
  }
  if (a === 4 && b === 9 && c === 32) {
    return 'OK';
  }
});
```

<a name="react-component-methods"></a>

### 9. Poking into React components methods:

Suppose `foo` is called when mounting Button.

###### sinon

```js
sinon.spy(Button.prototype, 'foo');

wrapper = shallow(<Button />);

expect(Button.prototype.foo.called).toEqual(true);
```

###### jest

```js
jest.spyOn(Button.prototype, 'foo');

wrapper = shallow(<Button />);

expect(Button.prototype.foo).toHaveBeenCalled();
```

###### can be used together

```js
const jestSpy = jest.spyOn(Button.prototype, 'doSomething');
const sinonSpy = sinon.spy(Button.prototype, 'doSomething');
```

```js
wrapper = shallow(React.createElement(Button));
```

```js
expect(jestSpy).toHaveBeenCalled();
expect(sinonSpy.called).toEqual(true);
```

<a name="timers"></a>

### 10. Timers:

###### sinon

Fake the date:

```js
const clock = sinon.useFakeTimers({
  now: new Date(TIMESTAMP)
});
```

Fake the ticks:

```js
const clock = sinon.useFakeTimers({
  toFake: ['nextTick']
});
```

Restore it:

```js
clock.restore();
```

###### jest

Enable fake timers:

```js
jest.useFakeTimers();
```

```js
setTimeout(() => {
  setTimeout(() => {
    console.log('Don Inodoro!');
  }, 200);
  console.log('Negociemos');
}, 100);
```

Fast-forward until all timers have been executed:

```js
jest.runAllTimers(); // Negociemos Don Inodoro!
```

Run pending timers, avoid nested timers:

```js
jest.runOnlyPendingTimers(); // Negociemos
jest.runOnlyPendingTimers(); // Don Inodoro!
```

Fast-forward until the value (in millis) and run all timers in the path:

```js
jest.runTimersToTime(100); // Negociemos
jest.runTimersToTime(200); // Don Inodoro!
```

> jest 22.0.0: .advanceTimersByTime

Clear all timers:

```js
jest.clearAllTimers();
```

##### Date: Use Lolex

`Jest` does not provide a way of faking the Date, we use here [lolex](https://github.com/sinonjs/lolex),
a library extracted from `sinon`, with a implementation of the **timer APIs**: _setTimeout_, _clearTimeout_,
_setImmediate_, _clearImmediate_, _setInterval_, _clearInterval_, _requetsAnimationFrame_ and _clearAnimationFrame_,
a **clock instance** that controls the flow of time, and a **Date** implementation.

```js
clock = lolex.install({
  now: TIMESTAMP
});
```

##### Fake the ticks:

```js
clock = lolex.install({
  toFake: ['nextTick']
});

let called = false;

process.nextTick(function() {
  called = true;
});
```

Forces nextTick calls to flush synchronously:

```js
clock.runAll();

expect(called).toBeTruthy();
```

Trigger a tick:

```js
clock.tick();
```

Restore it:

```
clock.uninstall();
```

<a name="jest-specific"></a>

## Jest specific

<a name="snapshot-testing"></a>

### 1. Snapshot testing:

> Clean obsolete snapshots: `npm t -- -u`
>
> Update snapshots: `npm t -- --updateSnapshot`

###### snapshot of a function output

```js
expect(fn()).toMatchSnapshot();
```

###### snapshot of a React Component (using react-test-renderer)

```js
expect(ReactTestRenderer.create(React.createElement(Button))).toMatchSnapshot();
```

```js
const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();
```

<a name="automock"></a>

### 2. Automock

Jest disabled the [automock](https://facebook.github.io/jest/blog/2016/09/01/jest-15.html#disabled-automocking) feature by default.
Enabling it again from the setup file `./tests/setupTests`:

```js
jest.enableAutomock();
```

Now all dependencies are mocked, we must whitelist some of them, from `package.json`:

```json5
"jest": {
    "unmockedModulePathPatterns": [
      "<rootDir>/src/react-component/Button.js",
      "<rootDir>/node_modules/axios",
      "<rootDir>/node_modules/enzyme",
      "<rootDir>/node_modules/enzyme-adapter-react-16",
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-test-renderer",
      "<rootDir>/node_modules/sinon"
    ]
    ...
```

or otherwise unmock them from the test:

```js
jest.unmock('./path/to/dep');
const Comp = require('../Comp'); // depends on dep, now will use the original
```

##### Using the mock with spies

```js
// MOCK: path/to/original/__mocks__/myService
module.exports = {
  get: jest.fn()
};
```

then from the test:

```js
const mockService = require('path/to/original/myService');
```

```js
// Trigger the use of the service from tested component
wrapper.simulate('click');
expect(mockService.get).toHaveBeenCalled();
```

## Pending work

Refer to [backlog](./BACKLOG.md).

## Contributing

Please, clone this repo and send your PR.
Make sure to add your examples as unit tests and the explanation of
the case into the README file.
If you will add something specific of a library, make sure that
is not somehow achievable with the other ;)
