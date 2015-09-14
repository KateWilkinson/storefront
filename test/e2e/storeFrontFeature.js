describe('Store Front', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000/storefront.html');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('StoreFront');
  });

  it('displays available products on the store homepage', function(){
    var products = element.all(by.repeater('product in storeCtrl.allProducts').row(0).column('name'));
    expect(products.first().getText()).toEqual('Almond Toe Court Shoes, Patent Black');
  });

  it('displays a list of the 13 products in the products JSON object', function() {
    var products = element.all(by.repeater('product in storeCtrl.allProducts'));
    expect(products.count()).toEqual(13);
  });

  it('displays shopping cart when the cart button is clicked', function(){
    element(by.id('shopping-cart')).click();
    expect(element(by.id('cart-total')).isPresent()).toBeTruthy();
  });

  it('adds item to shopping cart when add to cart button is clicked', function(){
    var cart = element.all(by.repeater('item in cartCtrl.shoppingCart track by $index'));
    element(by.css('.add-btn')).click();
    expect(cart.count()).toEqual(1);
  });

  it('displays current total price of the shopping cart', function(){
    element(by.css('.add-btn')).click();
    element(by.id('shopping-cart')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('£99.00');
  });
});