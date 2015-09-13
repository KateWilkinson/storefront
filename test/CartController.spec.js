describe('CartController', function() {
  beforeEach(module('storeFront'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('CartController');
  }));

  it('initialises with an empty shopping cart', function() {
    expect(ctrl.shoppingCart).toEqual([]);
  });

  describe('add to cart', function() {

    it('adds selected item to the shopping cart array', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      expect(ctrl.shoppingCart[0].name).toEqual('Mohair cardigan');
    });
  });

  describe('remove from cart', function() {
    it('removes the selected item from the shopping cart array', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.addToCart({name:'Leather skirt', price: 40.00});
      ctrl.addToCart({name:'Striped Tee', price: 20.00});
      ctrl.removeFromCart('Mohair cardigan');
      expect(ctrl.shoppingCart).toEqual([{name:'Leather skirt', price: 40.00}, {name:'Striped Tee', price: 20.00}]);
    });
  });

});
