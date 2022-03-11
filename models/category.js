//mongodb+srv://awesome-user:seattle@cluster0.m6wxj.mongodb.net/inventory?retryWrites=true&w=majority

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
name:{type: String, required: true},
description:{type: String, required: true}
})

//virtual for product url
CategorySchema.virtual('url').get(function(){
    return '/store/category/' + this._id;
})

//export model
module.exports = mongoose.model('Category',CategorySchema);