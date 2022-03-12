const async = require('async');
const Category = require('../models/category');
const Product = require('../models/product')

// Display category create form on GET.
exports.category_create_get = function(req, res,next) {
    res.send('category create get');
};


// Display category create form on POST.
exports.category_create_post = function(req, res,next) {
    res.send('category create post');
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res) {
    res.send('category delete GET');
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res,next) {
    res.send('category delete POST');
};


// Display category update form on GET.
exports.category_update_get = function(req, res,next) {
    res.send('category update GET');
};

// Handle category update on POST.
exports.category_update_post = function(req, res,next) {
    res.send('category update POST');
};

//display category list
exports.category_list = function(req,res,next){
    res.redirect('/store')
    }
    

// Display detail page for a specific category
 exports.category_detail = function(req, res,next) {
        async.parallel({
            category: function(callback){
                Category.findById(req.params.id)
                .exec(callback);
            },
          category_products:function(callback){
                Product.find({'category':req.params.id })
                .exec(callback);
            },
            }, function(err, results) {
                if (err) { return next(err); }
                if (results.category==null) { // No results.
                    var err = new Error('Category not found');
                    err.status = 404;
                    return next(err);
                }
                // Successful, so render
                res.render('category_detail', { title: 'Category Details', category: results.category, category_products: results.category_products })


                console.log('category products'+ results.category_products)
            
            })    };