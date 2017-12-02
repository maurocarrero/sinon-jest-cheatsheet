# Sinon # Jest (a cheatsheet).
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Some examples on how to achieve the same goal with either of both libraries: [sinon](http://sinonjs.org/) and [jest](http://facebook.github.io/jest/).
Also some of those goals achievable only by one of these tools.

###### Clone the repo:
```
git clone https://github.com/maurocarrero/sinon-jest-cheatsheet.git
```

###### Install and run tests:

```
npm install
``` 

## Table of Contents
##### [Spies](#spies)
1. [Create Spies](#create-spies)
2. [Are they called?](#are-they-called)
3. [How many times?](#how-many-times)
4. [Checking arguments](#checking-arguments)
5. [Spy on objects methods](#spy-on-objects-method)
6. [Restore original methods](#restore-original-method)
7. [Return value](#return-value)
8. [Custom implementation](#custom-implementation)
9. [Poking into React component methods](#react-component-methods)

##### [Jest specific](#jest-specific)
1. [Snapshot testing](#snapshot-testing)

<a name="spies"></a>
## Spies <a name="create-spies"></a>

### 1. Create spies:  

###### sinon

```
const spy = sinon.spy()
```

###### jest
```
const spy = jest.fn()
```

<a name="are-they-called"></a>
### 2. Know if they are called: 

###### sinon

```
spy.called === true;

```

###### jest
```
spy.mock.calls.length >= 1;
```

```
expect(spy).toHaveBeenCalled();
```

<a name="how-many-times"></a>
### 3. How many times are called: 

###### sinon

```
spy.calledOnce
spy.calledTwice
spy.calledThrice
spy.callCount
```

###### jest
```
spy.mock.calls.length === n;
```

```
expect(spy).toHaveBeenCalledTimes(n);
```

<a name="checking-arguments"></a>
### 4. Checking arguments:

###### sinon

```
// args[call][argIdx]
spy.args[0,0]
```

```
// spy.calledWith(...args)
spy.calledWith(1, 'Hey')
```

###### jest
```
// mock.calls[call][argIdx]
spy.mock.calls[0][0]
```

```
expect(spy).toHaveBeenCalledWith(1, 'Hey');
expect(spy).toHaveBeenLastCalledWith(1, 'Hey');
```

```
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

```
sinon.spy(someObject, 'aMethod');
```

###### jest

```
jest.spyOn(someObject, 'aMethod');
```

<a name="restore-original-method"></a>
### 6. Restore original method 

###### sinon

```
someObject.aMethod.restore();
```

###### jest

```
someObject.aMethod.mockRestore();
```

<a name="return-value"></a>
### 7. Spy on method and return value:
###### sinon

```
sinon.stub(operations, 'add')
    .returns(89);
```

###### jest

```
sinon.stub(operations, 'add')
    .mockReturnValue(89);
```

```
sinon.stub(operations, 'add')
    .mockReturnValueOnce(89);
```

<a name="custom-implementation"></a>
### 8. Custom implementation:

        
###### sinon

```
stub = sinon.stub(operations, 'add');
stub.withArgs(42).returns(89);
stub.withArgs(4, 9, 32).returns('OK');
```

###### jest

```
jest.spyOn(operations, 'add')
  .mockImplementation(function (a, b, c) {
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

```
sinon.spy(Button.prototype, 'foo');

wrapper = shallow(<Button />);

expect(Button.prototype.foo.called).toEqual(true);
```

###### jest

```
jest.spyOn(Button.prototype, 'foo');

wrapper = shallow(<Button />);

expect(Button.prototype.foo).toHaveBeenCalled();
```

<a name="jest-specific"></a>
## Jest specific

<a name="snapshot-testing"></a>
### 1. Snapshot testing:

> Clean obsolete snapshots: `npm t -- -u`
> Update snapshots: `npm t -- --updateSnapshot`

###### snapshot of a function output

```
expect(fn()).toMatchSnapshot();
```


###### snapshot of a React Component (using react-test-renderer)

```
expect(
  ReactTestRenderer.create(React.createElement(Button))
).toMatchSnapshot();
``` 

```
const tree = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  ).toJSON()
```


