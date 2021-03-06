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
    expect(element(by.id('cart-total')).getText()).toEqual('Total £99.00');
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
    expect(element(by.id('cart-total')).getText()).toEqual('Total £0.00');
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
    expect(element(by.id('cart-total')).getText()).toEqual('Total £94.00');
  });

  it('discount cannot be applied twice', function(){
    element(by.id('shopping-cart')).click();
    element.all(by.css('.add-btn')).get(0).click();
    element(by.id('voucher-input')).sendKeys('DISCOUNT5');
    element(by.css('.voucher-btn')).click();
    element(by.id('voucher-input')).sendKeys('DISCOUNT5');
    element(by.css('.voucher-btn')).click();
    expect(element(by.id('cart-total')).getText()).toEqual('Total £94.00');
  });

  it('item displays text "out of stock" if out of stock', function() {
    var products = element.all(by.repeater('product in storeCtrl.allProducts'));
    expect(products.get(4).element(by.css('.outofstock')).isDisplayed()).toEqual(true);
  });

  it('add to cart button is not visible if item is out of stock', function() {
    var products = element.all(by.repeater('product in storeCtrl.allProducts'));
    expect(products.get(4).element(by.css('.add-btn')).isDisplayed()).toEqual(false);
  });

  it('item goes out of stock when all stock is added to the shopping cart', function(){
    var products = element.all(by.repeater('product in storeCtrl.allProducts'));
    element.all(by.css('.add-btn')).get(10).click();
    expect(products.get(10).element(by.css('.outofstock')).isDisplayed()).toEqual(true);
  });

});
