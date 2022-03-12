#! /usr/bin/env node

console.log('This script populates some test products,categories to my inventory database');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/product')
var Category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var products = []


function categoryCreate(name,description,cb) {
  var category = new Category({ name: name,description:description});
       
  category.save(function (err) {
    if (err) {
      cb(err,null);
      return;
    }
    console.log('New category: ' + category);
    categories.push(category);
    cb(null,category)
  });
}

function productCreate(name, description, price,totalInStock,category,cb) {
  productdetail = { 
    name: name,
    description: description,
    price: price,
    totalInStock: totalInStock,

  }
  if (category != false) productdetail.category = category
 
  var product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {
      cb(err,null);
      return;
    }
    console.log('New product: ' + product);
    products.push(product);
    cb(null,product);
  }  );
}



function createCategories(cb) {
  async.parallel([
      function(callback) {
        categoryCreate('Men\'s shirts', 'This category consists of shirts for men.', callback)
      },
      function(callback) {
        categoryCreate('Men\'s tee-shirts', 'This category has t-shirts for men.', callback)
      },
     
      ],
      // Optional callback
      cb);
}



function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('Highlander White Casual Shirt', 'White casual shirt, has a spread collar, a full button placket, a patch pocket, long sleeves with roll-up button tabs, a curved hemline', '669', '60',[categories[0]],callback)
        },
        function(callback) {
          productCreate('Highlander Olive Green Slim Fit Casual Shirt', 'Olive green casual shirt, has a mandarin collar, a full button placket, long sleeves, a patch pocket, and a curved hemline', '969', '100',[categories[0]],callback)
        },
        function(callback) {
          productCreate('Men Black & White Brand Logo Printed Gym T-shirt', 'Black and white t-shirt for men,Brand logo printed,Regular length,Round neck, regular sleeves', '1444', '80',[categories[1]],callback)
        },
        function(callback) {
          productCreate('Ultralyte Men Black Running T-shirt', 'Swap your usual T-shirt with the HRX Running T-shirt and feel your run become easier and more comfortable. Designed with Rapid Dry technology, it wicks away sweat to keep you cool and dry from start to finish.', '337', '70',[categories[1]],callback)
        },
        function(callback) {
          productCreate('Men Beige & Black Typography Printed Sustainable T-shirt', 'Beige and Black printed T-shirt, has a round neck, and short sleeves', '337', '90',[categories[1]],callback)
        },
        ],
        // optional callback
        cb);
}


async.series([
  createCategories,
    createProducts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Categories: '+categories);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




