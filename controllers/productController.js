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
 Product.findById(req.params.id).populate('category')
 .exec(callback);
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
  async.parallel({
      category:function(callback){
          Category.find(callback);
      },
      },function(err,result){
if(err){
    return next(err)
}
res.render('product_create',{title:'Create new product',category:result.category});
})
}

//handle product create on POST
exports.productCreatePost = function(req,res,next){
    const product = new Product({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        totalInStock:req.body.totalInStock,
        category:req.body.category
    })

    product.save(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/store/products')
    })
}

//handle product update on GET
exports.productUpdateGet = function(req,res,next){
    async.parallel({
        product:function(callback){
            Product.findById(req.params.id).populate('category')
            .exec(callback);
            },
        category:function(callback){
            Category.find(callback);
        },

        },function(err,result){
  if(err){
      return next(err)
  }
  res.render('product_create',{title:'Update product',category:result.category,product:result.product});
  console.log(result.category)
  })
}

//handle product update on POST
exports.productUpdatePost = function(req,res,next){
    const product = new Product(
        {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            totalInStock:req.body.totalInStock,
            category:req.body.category,
            _id:req.params.id
        }
    )
    Product.findByIdAndUpdate(req.params.id,product,function(err,updatedProduct){
        if(err){
            return next(err)
        }
        res.redirect(updatedProduct.url)
    })
}

//handle product delete on GET
exports.productDeleteGet = function(req,res,next){
    async.parallel({
        product: function(callback){
       Product.findById(req.params.id)
       .exec(callback);
        }
      },
      function(err,data){
          if(err){
              return next(err)
          }
          res.render('product_delete',{product:data.product})
          })
}

//handle product delete on POST
exports.productDeletePost = function(req,res,next){
    Product.findByIdAndDelete(req.params.id,function(err){
        if(err){
            return next(err)
        } else {
          res.redirect('/store/products')  
        }
    })
}


