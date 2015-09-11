describe('storeFrontController', function() {
  beforeEach(module('storeFront'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('storeFrontController');
  }));

  it('', function() {
    expect(ctrl.searchResult).toBeUndefined();
    expect(ctrl.searchTerm).toBeUndefined();
  });
});
