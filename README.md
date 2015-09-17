# StoreFront

[![Build Status](https://travis-ci.org/KateWilkinson/storefront.svg?branch=master)](https://travis-ci.org/KateWilkinson/storefront) [![Code Climate](https://codeclimate.com/github/KateWilkinson/storefront/badges/gpa.svg)](https://codeclimate.com/github/KateWilkinson/storefront)

## Summary

An implementation of a responsive website for a clothes retailer, built as a single page application in JavaScript with AngularJS using TDD and Agile methodologies.

![Screenshot](./public/screenshots/screenshot1.jpg?raw=true)

## How to install & run

You'll need to have Git, Node (with npm) and Bower installed

Run the following commands in the command line to install locally, and then go to ```localhost:8000/storefront.html``` to load in the browser

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

* HTML file for view - ```./storefront.html```
* Angular controllers - ``` ./scripts/app.js```
* Unit tests in ```./test/CartController.spec.js``` & ```./test/StoreController.spec.js```
* Feature tests in ```./test/e2e/storeFrontFeature.js```

The discount codes that can be used are 'DISCOUNT5' which discounts £5 from any order, 'DISCOUNT10' which discounts £10 from an order over £50, and 'DISCOUNT15' which discounts £15 from an order over £75 which includes at least one footwear item.

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

I decided to use the Angular framework for this project because the brief leant itself to designing a primarily front-end based, responsive SPA with good UX. I made the following decisions when implementing my design:

* Product information is stored in a JSON file and called in using a service. Given that the app is currently on a limited scale, it seemed sensible to call data in this way rather than set up a database.
* I modelled the domain with three key components - my products, stored as JSON, my store controller which handles calling in those products and displaying them, and my cart controller which handles the movement of those products into and out of the shopping bag.
* I decided that vouchers should be handled as discount codes, and that a user should only be able to apply one voucher at a time. The user is presented with a discount code to apply when their shopping bag meets the required parameters, rather than providing a full list of codes and requirements.
* I used TDD to build the app iteratively, beginning with the first user story and writing unit tests to ensure back end logic was working correctly before moving onto the front end functionality, which I tested with Protractor. I tried to ensure that I had fully tested code which satisfied each user story before moving onto the next.
* UX is important for this application - I designed the page with a 3*3 grid layout (using Bootstrap) with clean background and navigation and large images. The shopping bag drops into view when the 'bag' button is clicked but there is a badge visible at all times displaying the number of items in the bag.

## Technologies used

* Node; JavaScript; AngularJS; Express; HTML; CSS & Bootstrap
* Tested using Karma and Protractor

## To do & further improvements

* Extract discount codes into a separate file, to enable refactoring of discount functionality. Different discounts should be able to be applied as needed and code should be more maintainable. Extract all voucher functionality into a separate controller.
* Deploy to Heroku.
* Add functionality for the user to filter the products they see based on category or price.
* Look into setting up a MongoDB database to store the product information so the app can be scaled up as needed.
* Set up AWS for image hosting so the app can be scaled up as needed.
* Look into how I could handle payments, possibly using Stripe.
* Enhance design - add current shopping bag total to navbar & potentially move product information onto a rollover on top of the product image.
