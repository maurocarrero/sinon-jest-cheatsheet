const sinon = require('sinon');

function Peteco() {}

Peteco.prototype.hola = function() {
  return 'hola';
};
Peteco.prototype.chau = function() {
  return 'chau';
};

it("sinon.spy(Peteco.prototype, 'hola')", function() {
  const holaSpy = sinon.spy(Peteco.prototype, 'hola');
  const chauSpy = sinon.spy(Peteco.prototype, 'chau');

  new Peteco().hola();
  new Peteco().chau();

  expect(holaSpy.called).toEqual(true);
  expect(chauSpy.called).toEqual(true);
});

it("jest.spyOn(Peteco.prototype, 'hola')", function() {
  const holaSpy = jest.spyOn(Peteco.prototype, 'hola');
  const chauSpy = jest.spyOn(Peteco.prototype, 'chau');

  new Peteco().hola();
  new Peteco().chau();

  expect(holaSpy).toHaveBeenCalled();
  expect(chauSpy).toHaveBeenCalled();
});
