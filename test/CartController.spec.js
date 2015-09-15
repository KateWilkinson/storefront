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

  describe('cart total', function(){
    it('displays a total price for all items currently in the cart', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.addToCart({name:'Leather skirt', price: 40.00});
      expect(ctrl.cartTotal).toEqual(70.00);
    });
  });

  describe('update cart total', function(){
    it('corrects total price when an item is removed from the cart', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.removeFromCart('Mohair cardigan');
      expect(ctrl.cartTotal).toEqual(0.00);
    });
  });

  describe('apply discount', function() {
    it('applies £5 discount to current cart total when correct code is input', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.applyDiscount('DISCOUNT5');
      expect(ctrl.cartTotal).toEqual(25.00);
    });

    it('does not apply £5 discount when incorrect code is input', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('applies £10 discount when correct code is input & total is over £50', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.addToCart({name:'Leather skirt', price: 40.00});
      ctrl.applyDiscount('DISCOUNT10');
      expect(ctrl.cartTotal).toEqual(60.00);
    });

    it('does not apply £10 discount when incorrect code is input', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('does not apply £10 discount when total is less than £50', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00});
      ctrl.applyDiscount('DISCOUNT10');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('applies £15 discount when correct code is input, total is over £75 and one of the items in the cart is footwear', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Leather skirt', price: 40.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Gold sandals', price: 20.00, category:"Women's footwear"});
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(75.00);
    });

    it('does not apply £15 discount when incorrect code is input', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Leather skirt', price: 40.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Gold sandals', price: 20.00, category:"Women's footwear"});
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(90.00);
    });

    it('does not apply £15 discount when total is less than £75', function() {
      ctrl.addToCart({name:'Leather skirt', price: 40.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Gold sandals', price: 20.00, category:"Women's footwear"});
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(60.00);
    });

    it('does not apply £15 discount when there is no footwear item in the cart', function() {
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Leather skirt', price: 40.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Striped tshirt', price: 20.00, category:"Women's casualwear"});
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(90.00);
    });

    it('does not apply a discount if a discount has already successfully been applied', function(){
      ctrl.addToCart({name:'Mohair cardigan', price: 30.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Leather skirt', price: 40.00, category:"Women's casualwear"});
      ctrl.addToCart({name:'Gold sandals', price: 40.00, category:"Women's footwear"});
      ctrl.applyDiscount('DISCOUNT15');
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(95.00);
    });
  });


});
