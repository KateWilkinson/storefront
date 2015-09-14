var app = angular.module('storeFront', ['ngResource']);

app.controller('StoreController', [ '$http', function($http){
  var store = this;
  store.allProducts = [ ];

  $http.get('storeProducts.json').success(function(data){
    store.allProducts = data;
  });
}]);

app.controller('CartController', function(){
  this.shoppingCart = [];

  var cart = this.shoppingCart;

  this.cartTotal = 0;
  
  self = this;

  this.addToCart = function(item){
    cart.push(item);
    self.updateCartTotal();
  };

  this.removeFromCart = function(item){
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].name === item) {
        cart.splice(i, 1);
      }
    }
    self.updateCartTotal();
  };

  this.updateCartTotal = function() {
    var sum = 0;
    for(var i = 0; i < cart.length; i++) {
      sum = sum + cart[i].price;
    }
    self.cartTotal = sum;
  };

});
