describe('StoreController', function() {
  beforeEach(module('storeFront'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreController');
  }));

  it ('store initialises with data from JSON object', function(){
    expect(ctrl.allProducts).toContain('Almond Toe Court Shoes');
  });

});
