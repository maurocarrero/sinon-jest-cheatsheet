const { act } = require('react');
const React = require('react');
const sinon = require('sinon');
const { render, fireEvent } = require('@testing-library/react');

const Button = require('../src/react-component/Button');
const httpService = require('../src/react-component/httpService');

describe('sinon', () => {
  it('should call the mocked service', async () => {
    const stub = sinon.stub().resolves('stubbed from sinon');

    const { container } = render(React.createElement(Button, { get: stub }));
    const button = container.querySelector('button');

    await act(async () => {
      fireEvent.click(button);
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(stub.callCount).toBe(1);
    expect(stub.firstCall.args[0]).toBe(httpService.GITHUB_URL);
  });
});

describe('jest', () => {
  it('should call the mocked service', async () => {
    const spy = jest.fn().mockResolvedValue('stubbed from jest');

    const { container } = render(React.createElement(Button, { get: spy }));
    const button = container.querySelector('button');

    await act(async () => {
      fireEvent.click(button);
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(httpService.GITHUB_URL);
  });
});
