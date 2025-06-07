const sinon = require('sinon');
const React = require('react');
const { render, screen } = require('@testing-library/react');
const userEvent = require('@testing-library/user-event').default;

const Button = require('../src/react-component/Button');

describe('sinon', () => {
  let sinonCDMSpy;
  let sinonRenderSpy;
  let sinonDoSomethingSpy;
  let sinonClickHandlerSpy;

  beforeEach(() => {
    sinonCDMSpy = sinon.spy(Button.prototype, 'componentDidMount');
    sinonRenderSpy = sinon.spy(Button.prototype, 'render');
    sinonDoSomethingSpy = sinon.spy(Button.prototype, 'doSomething');
    sinonClickHandlerSpy = sinon.spy(Button.prototype, 'clickHandler');

    render(React.createElement(Button));
  });

  afterEach(() => {
    sinonCDMSpy.restore();
    sinonRenderSpy.restore();
    sinonDoSomethingSpy.restore();
    sinonClickHandlerSpy.restore();
  });

  it('spy on componentDidMount', () => {
    expect(sinonCDMSpy.called).toBe(true);
  });

  it('spy on render', () => {
    expect(sinonRenderSpy.called).toBe(true);
  });

  it('spy on doSomething', () => {
    expect(sinonDoSomethingSpy.called).toBe(true);
  });

  it('spy on clickHandler', async () => {
    expect(sinonClickHandlerSpy.called).toBe(false);
    const button = screen.getByRole('button'); // Asume que Button renderiza un <button>
    await userEvent.click(button);
    expect(sinonClickHandlerSpy.called).toBe(true);
  });
});

describe('jest', () => {
  let jestCDMSpy;
  let jestRenderSpy;
  let jestDoSomethingSpy;
  let jestClickHandlerSpy;

  beforeEach(() => {
    jestCDMSpy = jest.spyOn(Button.prototype, 'componentDidMount');
    jestRenderSpy = jest.spyOn(Button.prototype, 'render');
    jestDoSomethingSpy = jest.spyOn(Button.prototype, 'doSomething');
    jestClickHandlerSpy = jest.spyOn(Button.prototype, 'clickHandler');

    render(React.createElement(Button));
  });

  afterEach(() => {
    jestCDMSpy.mockRestore();
    jestRenderSpy.mockRestore();
    jestDoSomethingSpy.mockRestore();
    jestClickHandlerSpy.mockRestore();
  });

  it('spy on componentDidMount', () => {
    expect(jestCDMSpy).toHaveBeenCalled();
  });

  it('spy on doSomething', () => {
    expect(jestDoSomethingSpy).toHaveBeenCalled();
  });

  it('spy on clickHandler', async () => {
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(jestClickHandlerSpy).toHaveBeenCalled();
  });
});

describe('sinon && jest', () => {
  it('spying both at a time', () => {
    const jestSpy = jest.spyOn(Button.prototype, 'doSomething');
    const sinonSpy = sinon.spy(Button.prototype, 'doSomething');

    expect(jestSpy).not.toHaveBeenCalled();
    expect(sinonSpy.called).toBe(false);

    render(React.createElement(Button));

    expect(jestSpy).toHaveBeenCalled();
    expect(sinonSpy.called).toBe(true);
  });
});
