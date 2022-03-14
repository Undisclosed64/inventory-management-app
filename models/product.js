const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
name:{type:String, required: true},
description: {type:String,required: true},
price:{type:Number,required:true},
totalInStock: {type:Number,required: true},
category: [{type: Schema.Types.ObjectId,ref:'Category'}],
img:
{
    data: Buffer,
    contentType: String
}
})

//virtual for product url
ProductSchema.virtual('url').get(function(){
    return '/store/product/' + this._id;
})

//export model
module.exports = mongoose.model('Product',ProductSchema);