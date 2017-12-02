const sinon = require("sinon");

describe("SPIES", function() {
  const someObject = {
    id: 43,
    model: "C4",
    getModel: function() {
      return this.model;
    }
  };

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

  describe("spy on method", function() {
    it("sinon.spy(obj, 'method')", function() {
      sinonSpy = sinon.spy(someObject, "getModel");

      someObject.getModel();

      expect(sinonSpy.called).toEqual(true);

      sinonSpy.restore();
    });

    it("jest.spyOn(obj, 'method')", function() {
      jestSpy = jest.spyOn(someObject, "getModel");

      someObject.getModel();

      expect(jestSpy).toHaveBeenCalled();

      jestSpy.mockRestore();
    });
  });
});
