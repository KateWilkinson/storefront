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

  this.addToCart = function(item){
    cart.push(item);
  };

  this.removeFromCart = function(item){
    for(var i = 0; i < cart.length; i++) {
      if(cart[i].name === item) {
        cart.splice(i, 1);
      }
    }
  };

});
