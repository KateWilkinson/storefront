describe('StoreController', function() {
  beforeEach(module('storeFront'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreController');
  }));

  it('initialises with an empty array for products', function(){
    expect(ctrl.allProducts).toEqual([ ]);
  });

  var httpBackend;

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .expectGET("storeProducts.json")
      .respond(
        products
        );
  }));

  var products = [
    {
      "name":"Almond Toe Court Shoes, Patent Black",
      "category":"Women's Footwear",
      "price":99.00,
      "quantity":5
    },
    {
      "name":"Suede Shoes, Blue",
      "category":"Women's Footwear",
      "price":42.00,
      "quantity":4
    }
  ];

  it('completes a http request to JSON and pulls objects into products array', function() {
    httpBackend.flush();
    expect(ctrl.allProducts).toEqual(products);
  });
  
});
