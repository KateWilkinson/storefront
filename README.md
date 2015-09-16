# StoreFront

## Summary

An implementation of a responsive website for a clothes retailer, built as a single page application in Javascript and AngularJs using TDD and Agile methodologies.

## How to run

Run the following commands in the command line to install locally, and then go to ```localhost:8000/storefront.html``` to run the code in the browser

```
git clone https://github.com/KateWilkinson/storefront.git
cd storefront
npm install
bower install
node server.js

```

To run unit tests

```
karma start test/karma.conf.js
```

To run feature tests ( ensure server and webdriver are left running in the terminal )

```
node server.js
webdriver-manager start
protractor test/e2e/conf.js
```

## Overview of code layout

## User stories & Implementation

### User stories
```
- As a user I can add a product to my shopping cart
- As a user I can remove a product from my shopping cart
- As a user I can view the total price for the products in my shopping cart
- As a user I can apply a voucher to my shopping cart
- As a user I can view the total price for the products in my shopping cart with discount applied
- As a user I am alerted when I apply an invalid voucher to my shopping cart
- As a user I am unable to add out of stock products to the shopping cart
```

### Implementation


## Technologies used

* Javascript; AngularJS; HTML; CSS & Bootstrap
* Tested using Karma and Protractor

## Further improvements
