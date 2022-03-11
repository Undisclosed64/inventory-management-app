const category = require('../models/category');

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
    res.send('category list page')
    }
    
    // Display detail page for a specific category
    exports.category_detail = function(req, res,next) {
        res.send('Category detail page: ' + req.params.id);
    };