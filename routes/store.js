const express = require('express');
const router = express.Router();

//import controller modules
const product_controller = require('../controllers/productController');
const category_controller = require('../controllers/categoryController');

//get home page
router.get('/',product_controller.index);

// GET request for creating a product
router.get('/product/create', product_controller.productCreateGet);

// POST request for creating a product
router.post('/product/create', product_controller.productCreatePost);

// GET request to delete product
router.get('/product/:id/delete', product_controller.productDeleteGet);

// POST request to delete product.
router.post('/product/:id/delete', product_controller.productDeletePost);

// GET request to update product.
router.get('/product/:id/update', product_controller.productUpdateGet);

// POST request to update product.
router.post('/product/:id/update', product_controller.productUpdatePost);

// GET request for one product.
router.get('/product/:id',product_controller.productDetails);

// GET request for list of all product items.
router.get('/products', product_controller.productsList);


//CATEGORY ROUTES

// GET request for creating a category
router.get('/category/create', category_controller.category_create_get);

// POST request for creating a category
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category
router.get('/category/:id',category_controller.category_detail);

// GET request for list of all category items.
router.get('/categories', category_controller.category_list);


module.exports = router;