const sinon = require('sinon');

let sinonSpy;
let jestSpy;

beforeAll(function() {
  sinonSpy = sinon.spy();
  jestSpy = jest.fn();
});

beforeEach(function() {
  sinonSpy.reset();
  jestSpy.mockReset();
});

afterAll(function() {
  sinonSpy = null;
  jestSpy = null;
});

describe('checking arguments', function() {
  /**
   * sinon
   */
  describe('sinon', function() {
    it('spy.args', function() {
      sinonSpy(1, 2);

      expect(sinonSpy.args[0][0]).toEqual(1);
      expect(sinonSpy.args[0][1]).toEqual(2);
    });

    it('spy.calledWith', function() {
      sinonSpy(1, 2);

      expect(sinonSpy.calledWith(1, 2)).toEqual(true);
    });
  });

  describe('jest', function() {
    it('spy.mock.calls', function() {
      jestSpy(1, 2);

      expect(jestSpy.mock.calls[0][0]).toEqual(1);
      expect(jestSpy.mock.calls[0][1]).toEqual(2);
    });

    it('.toHaveBeenCalledWith', function() {
      jestSpy(1, 2);

      expect(jestSpy).toHaveBeenCalledWith(1, 2);
    });
  });

  it('expect .toHaveBeenLastCalledWith', function() {
    jestSpy();
    jestSpy();
    jestSpy();
    jestSpy(7);

    expect(jestSpy).toHaveBeenLastCalledWith(7);
  });

  describe('expect .toHaveBeenCalledWith', function() {
    it('expect.anything()', function() {
      jestSpy(7);

      expect(jestSpy).toHaveBeenLastCalledWith(expect.anything());
    });

    it('expect.any(constructor)', function() {
      jestSpy(7);

      expect(jestSpy).toHaveBeenLastCalledWith(expect.any(Number));
    });

    it('expect.arrayContaining([ values ])', function() {
      jestSpy([7, 27, 33, 48]);

      expect(jestSpy).toHaveBeenLastCalledWith(expect.arrayContaining([33, 48]));
    });

    it('expect.objectContaining({ props })', function() {
      const mock = {
        id: 1,
        name: 'Peteco'
      };
      jestSpy(mock);

      expect(jestSpy).toHaveBeenCalledWith(expect.objectContaining({ id: mock.id }));
      expect(jestSpy).toHaveBeenLastCalledWith(expect.objectContaining({ name: mock.name }));
    });

    it('expect.stringContaining(string)', function() {
      jestSpy('This was all about foo bar.');

      expect(jestSpy).toHaveBeenCalledWith(expect.stringContaining('foo'));
    });

    it('expect.stringMatching(regexp)', function() {
      jestSpy('This was all about foo bar.');

      expect(jestSpy).toHaveBeenCalledWith(expect.stringMatching(/^This/));
    });
  });
});
