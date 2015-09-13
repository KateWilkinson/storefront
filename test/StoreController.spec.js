describe('StoreController', function() {
  beforeEach(module('storeFront'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('StoreController');
  }));

  var httpBackend;

  beforeEach(inject(function($httpBackend) {

    httpBackend = $httpBackend;
    httpBackend
      .when("GET", 'file:///Users/Kate/TechTests/storefront/storefront.html')
      .respond(
        { items: items }
      );
  }));

  var items = [
    {
      name: 'Faux Fur Coat',
      price: 30.00,
      category: "Women's Coats",
      quantity: 5
    },
    {
      name: 'Black Dress',
      price: 40.00,
      category: "Women's Formalwear",
      quantity: 10
    }
  ];

  it('displays items', function() {
    expect(ctrl.allProducts).toEqual(items);
  });
});
