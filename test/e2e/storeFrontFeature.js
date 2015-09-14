describe('Store Front', function() {

  beforeEach(function() {
    browser.get('http://localhost:8000/storefront.html');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('StoreFront');
  });

  it('displays available products on the store homepage', function(){
  });
});
