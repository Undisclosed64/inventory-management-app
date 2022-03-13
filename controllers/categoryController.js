const async = require('async');
const category = require('../models/category');
const Category = require('../models/category');
const Product = require('../models/product')

// Display category create form on GET.
exports.category_create_get = function(req, res,next) {
res.render('category_create',{title:'Create a new category'})
};

// Display category create form on POST.
exports.category_create_post = function(req, res,next) {

var category = new Category(
    { name: req.body.name,
    description:req.body.description
}
);
       
  category.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/store')
  });
};

// Display category delete form on GET.
exports.category_delete_get = function(req, res) {
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
    res.render('category_delete',{title:'Delete category',category: results.category, category_products: results.category_products})
})
};

// Handle category delete on POST.
exports.category_delete_post = function(req, res,next) {
   Category.findByIdAndDelete(req.params.id,function(err){
        if(err){
            return next(err)
        } else {
          res.redirect('/store')  
        }
    })
};


// Display category update form on GET.
exports.category_update_get = function(req, res,next) {
    async.series({
    category:function(callback){
    Category.findById(req.params.id)
    .exec(callback);
    },
},function(err,success){
        if(err){
            console.log(err)
            return next(err)
        }
res.render('category_create',{title:'Update category',category:success.category})
    })
}

// Handle category update on POST.
exports.category_update_post = function(req, res,next) {

    const category = new Category(
        {
            name:req.body.name,
            description:req.body.description,
            _id:req.params.id
        }
    )
    Category.findByIdAndUpdate(req.params.id,category,function(err,updatedCategory){
        if(err){
            return next(err)
        }
        res.redirect(updatedCategory.url)
    })
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