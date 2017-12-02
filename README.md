# Sinon Jest Cheatsheet

## Table of Contents
##### Spies
1. [Create Spies](#create-spies)
2. [Are they called?](#are-they-called)
3. [How many times?](#how-many-times)
4. [Checking arguments](#checking-arguments)
5. [Spy on objects methods](#spy-on-objects-method)
6. [Restore original methods](#restore-original-method)
7. [Custom implementation](#custom-implementation)
8. [Conditional custom implementation](#custom-implementation)

##### Jest specific
9. [Snapshot testing](#snapshot-testing)

## Spies

### 1. Create spies: <a name="create-spies"></a> 

###### sinon

```
const spy = sinon.spy()
```

###### jest
```
const spy = jest.fn()
```

### 2. Know if they are called: <a name="are-they-called"></a>

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

### 3. How many times are called: <a name="how-many-times"></a>

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

### 4. Checking arguments: <a name="checking-arguments"></a>

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

### 5. Spy on objects' methods <a name="spy-on-objects-method"></a>

###### sinon

```
sinon.spy(someObject, 'aMethod');
```

###### jest

```
jest.spyOn(someObject, 'aMethod');
```

### 6. Restore original method <a name="restore-original-method"></a>

###### sinon

```
someObject.aMethod.restore();
```

###### jest

```
someObject.aMethod.mockRestore();
```

### 7. Spy on method and return custom implementation <a name="custom-implementation"></a>

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

### 8. Conditional custom implementation <a name="conditional-custom-implementation"></a>

        
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

## Jest specific

### 9. Snapshot testing <a name="snapshot-testing"></a>

###### snapshot of a function output

```
expect(fn()).toMatchSnapshot();
```

```
expect(
  ReactTestRenderer.create(React.createElement(Button))
).toMatchSnapshot();
```

###### using react-test-renderer

```
const tree = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  ).toJSON()
```

