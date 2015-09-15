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
    expect(element(by.id('cart-total')).isDisplayed()).toEqual(true);
  });

  it('adds item to shopping cart when add to cart button is clicked', function(){
    var cart = element.all(by.repeater('item in cartCtrl.shoppingCart track by $index'));
    element.all(by.css('.add-btn')).get(0).click();
    expect(cart.count()).toEqual(1);
  });

  it('displays current total price of the shopping cart', function(){
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('shopping-cart')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('£99.00');
  });

  it('removes item from shopping cart when remove button is clicked', function(){
    var cart = element.all(by.repeater('item in cartCtrl.shoppingCart track by $index'));
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('shopping-cart')).click();
    element(by.css('.rmv-btn')).click();
    expect(cart.count()).toEqual(0);
  });

  it('updates the total price of the shopping cart when an item is removed',function(){
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('shopping-cart')).click();
    element(by.css('.rmv-btn')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('£0.00');
  });

  it('has an input field for entering discount vouchers', function(){
    element(by.id('shopping-cart')).click();
    expect(element(by.id('voucher-input')).isDisplayed()).toEqual(true);
  });

  it('discount voucher can be applied and total price will be updated', function(){
    element(by.id('shopping-cart')).click();
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('voucher-input')).sendKeys('DISCOUNT5');
    element(by.css('.voucher-btn')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('£94.00');
  });

  it('discount cannot be applied twice', function(){
    element(by.id('shopping-cart')).click();
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('voucher-input')).sendKeys('DISCOUNT5');
    element(by.css('.voucher-btn')).click();
    element(by.id('voucher-input')).sendKeys('DISCOUNT5');
    element(by.css('.voucher-btn')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('£94.00');
  });

  it('item cannot be added to cart if it is out of stock', function() {
    var cart = element.all(by.repeater('item in cartCtrl.shoppingCart track by $index'));
    element.all(by.css('.add-btn')).get(4).click();
    expect(cart.count()).toEqual(0);
  });

});
