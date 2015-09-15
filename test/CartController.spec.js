describe('CartController', function() {
  beforeEach(module('storeFront'));

  var ctrl;
  var cardigan = {name:'Mohair cardigan', price: 30.00, quantity: 5, category:"Women's casualwear"};
  var skirt = {name:'Leather skirt', price: 40.00, quantity: 5, category:"Women's casualwear"};
  var tshirt = {name:'Striped Tee', price: 20.00, quantity: 5, category:"Women's casualwear"};
  var dress = {name:'Black dress', price: 50.00, quantity: 0, category:"Women's casualwear"};
  var sandals = {name:'Gold sandals', price: 20.00, quantity: 5, category:"Women's footwear"};

  beforeEach(inject(function($controller) {
    ctrl = $controller('CartController');
  }));

  it('initialises with an empty shopping cart', function() {
    expect(ctrl.shoppingCart).toEqual([]);
  });

  describe('add to cart', function() {
    it('adds selected item to the shopping cart array', function() {
      ctrl.addToCart(cardigan);
      expect(ctrl.shoppingCart[0].name).toEqual('Mohair cardigan');
    });
    it('does not add selected item to shopping cart if qty is 0', function(){
      ctrl.addToCart(dress);
      expect(ctrl.shoppingCart).toEqual([]);
    });
  });

  describe('remove from cart', function() {
    it('removes the selected item from the shopping cart array', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.addToCart(tshirt);
      ctrl.removeFromCart(cardigan.name);
      expect(ctrl.shoppingCart).toEqual([{name:'Leather skirt', price: 40.00, quantity: 5, category:"Women's casualwear"}, {name:'Striped Tee', price: 20.00, quantity: 5, category:"Women's casualwear"}]);
    });
  });

  describe('cart total', function(){
    it('displays a total price for all items currently in the cart', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      expect(ctrl.cartTotal).toEqual(70.00);
    });
  });

  describe('update cart total', function(){
    it('corrects total price when an item is removed from the cart', function() {
      ctrl.addToCart(cardigan);
      ctrl.removeFromCart(cardigan.name);
      expect(ctrl.cartTotal).toEqual(0.00);
    });
  });

  describe('apply discount', function() {
    it('applies £5 discount to current cart total when correct code is input', function() {
      ctrl.addToCart(cardigan);
      ctrl.applyDiscount('DISCOUNT5');
      expect(ctrl.cartTotal).toEqual(25.00);
    });

    it('does not apply £5 discount when incorrect code is input', function() {
      ctrl.addToCart(cardigan);
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('applies £10 discount when correct code is input & total is over £50', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.applyDiscount('DISCOUNT10');
      expect(ctrl.cartTotal).toEqual(60.00);
    });

    it('does not apply £10 discount when incorrect code is input', function() {
      ctrl.addToCart(cardigan);
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('does not apply £10 discount when total is less than £50', function() {
      ctrl.addToCart(cardigan);
      ctrl.applyDiscount('DISCOUNT10');
      expect(ctrl.cartTotal).toEqual(30.00);
    });

    it('applies £15 discount when correct code is input, total is over £75 and one of the items in the cart is footwear', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.addToCart(sandals);
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(75.00);
    });

    it('does not apply £15 discount when incorrect code is input', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.addToCart(sandals);
      ctrl.applyDiscount('NOTADISCOUNT');
      expect(ctrl.cartTotal).toEqual(90.00);
    });

    it('does not apply £15 discount when total is less than £75', function() {
      ctrl.addToCart(skirt);
      ctrl.addToCart(sandals);
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(60.00);
    });

    it('does not apply £15 discount when there is no footwear item in the cart', function() {
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.addToCart(tshirt);
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(90.00);
    });

    it('does not apply a discount if a discount has already successfully been applied', function(){
      ctrl.addToCart(cardigan);
      ctrl.addToCart(skirt);
      ctrl.addToCart(sandals);
      ctrl.applyDiscount('DISCOUNT15');
      ctrl.applyDiscount('DISCOUNT15');
      expect(ctrl.cartTotal).toEqual(75.00);
    });
  });


});
