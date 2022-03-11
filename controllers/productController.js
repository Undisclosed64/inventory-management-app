const Product = require('../models/product');

exports.index = function(req,res,next){
    res.send('Home page');
}
//display list of products
exports.productsList = function(req,res,next){
    res.send('Product list page');
}

//display details of a specific product
exports.productDetails = function(req,res,next){
    res.send('Product details page');
}

//handle product create on GET
exports.productCreateGet = function(req,res,next){
    res.send('Product get create page');
}

//handle product create on POST
exports.productCreatePost = function(req,res,next){
    res.send('Product post create page');
}

//handle product update on GET
exports.productUpdateGet = function(req,res,next){
    res.send('Product get update page');
}

//handle product update on POST
exports.productUpdatePost = function(req,res,next){
    res.send('Product post update page');
}

//handle product delete on GET
exports.productDeleteGet = function(req,res,next){
    res.send('Product get delete page');
}

//handle product delete on POST
exports.productDeletePost = function(req,res,next){
    res.send('Product post delete page');
}


