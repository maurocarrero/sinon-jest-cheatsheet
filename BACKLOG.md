# Backlog

## [Sinon 4.1.2](http://sinonjs.org/releases/v4.1.2/)


### Sinon Spies
1. Spy on function example?
2. Calls: firstCall / secondCall / thirdCall / lastCall
3. Called
    1. calledBefore / calledAfter / calledImmediatelyBefore / calledImmediatelyAfter
    2. calledOn / alwaysCalledOn / calledWith / alwaysCalledWith / calledWithExactly / alwaysCalledWithExactly
    3. calledWithMatch / alwaysCalledWithMatch
    4. calledWithNew / neverCalledWith / neverCalledWithMatch
4. threw / alwaysThrew
5. returned / alwaysReturned
6. getCall(num) / getCalls
7. thisValues / exceptions / returnValues
8. printf

### Sinon Stubs
1. createStubInstance
2. onFirstCall / onSecondCall / onThirdCall
3. reset / resetHistory / resetBehavior
4. returnsArg / returnsThis
5. resolves / throws / rejects
6. callsArg / callsArgOn / callsArgWith / callsArgOnWith
7. callThrough
8. usingPromise(promiseLibrary)
9. yields / yieldsOn / yieldsTo / yieldsToOn
10. callArg / callArgWith
11. callsArgAsync / callsArgOnAsync / callsArgWithAsync / callsArgOnWithAsync
12. yieldsAsync / yieldsOnAsync / yieldsToAsync / yieldsToOnAsync
13. addBehavior
14. get / set / value

### Misc
1. **Mocks** (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) 
as well as pre-programmed expectations.
2. **Fake timers**.
3. **Fake XHR and server**.


## [Jest](http://facebook.github.io/jest/docs/en/api.html)

### Mock Functions
1. getMockName
2. mock.instances
3. mockClear / mockName / mockReturnThis
4. Timer mocks

### Misc
1. Globals, Expect and Matchers examples.
2. The Jest Object
