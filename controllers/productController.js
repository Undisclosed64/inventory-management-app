const Product = require('../models/product');
const Category = require('../models/category');

const async = require('async');

//home page 
exports.index = function(req,res,next){
Category.find({},'name')
.exec(function(err,category_list){
    if(err){
        return next(err)
    }
    res.render('index',{title: 'Inventory Management',category_list:category_list})
})

}
//display list of products
exports.productsList = function(req,res,next){
Product.find({})
.exec(function(err,list_products){
    if(err){return next(err)}
    res.render('product_list',{title:'Products list',product_list:list_products})
})
}

//display details of a specific product
exports.productDetails = function(req,res,next){
   
    async.parallel({
  product: function(callback){
 Product.findById(req.params.id)
 .populate('category')
.exec(callback)
  }
},
function(err,data){
    if(err){
        return next(err)
    }
    if (data.product==null) { // No results.
        var err = new Error(' not found');
        err.status = 404;
        return next(err);
    }
    res.render('product_details',{product:data.product})
    })
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

}

//handle product delete on POST
exports.productDeletePost = function(req,res,next){
    res.send('Product post delete page');
}


