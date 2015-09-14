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
  var cart = this.shoppingCart;
  var self = this;

  this.addToCart = function(item){
    cart.push(item);
    self.updateCartTotal();
    console.log(self.shoppingCart);
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
    var total = 0;
    for(var i = 0; i < cart.length; i++) {
      total = total + cart[i].price;
    }
    self.cartTotal = total;
  };


});
