var app = angular.module('storeFront', ['ngResource']);

app.controller('StoreController', [ '$http', function($http){
  var store = this;
  store.allProducts = [ ];

  $http.get('storeProducts.json').success(function(data){
    store.allProducts = data;
  });

  this.showCart = function(){
    if(store.show){
      store.show = false;
    } else {
      store.show = true;
    }
  };

}]);

app.controller('CartController', function(){
  this.shoppingCart = [];
  this.cartTotal = 0;

  var self = this;
  var discounted = false;

  this.addToCart = function(item){
    if(item.quantity > 0){
      self.shoppingCart.push(item);
      item.quantity --;
      self.updateCartTotal();
    }
  };

  this.removeFromCart = function(index){
    self.shoppingCart[index].quantity = self.shoppingCart[index].quantity + 1;
    self.shoppingCart.splice(index,1);
    self.updateCartTotal();
  };

  this.updateCartTotal = function() {
    var total = 0;
    for(var i = 0; i < self.shoppingCart.length; i++) {
      total = total + self.shoppingCart[i].price;
    }
    self.cartTotal = total;
  };

  this.applyDiscount = function(code) {
    if(!discounted){
      if(code === 'DISCOUNT5'){
        self.cartTotal = self.cartTotal - 5;
        discounted = true;
      }
      if(code === 'DISCOUNT10' && self.cartTotal > 50){
        self.cartTotal = self.cartTotal - 10;
        discounted = true;
      }
      if(code === 'DISCOUNT15' && self.cartTotal > 75){
        for(var i = 0; i < self.shoppingCart.length; i++) {
          if(/footwear/i.test(self.shoppingCart[i].category)) {
            self.cartTotal = self.cartTotal - 15;
            discounted = true;
          }
        }
      }
    }
  };


});
