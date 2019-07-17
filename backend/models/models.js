const mongoose = require("mongoose");
// Documents schema
module.exports = {

    UserType: new mongoose.Schema({
        name: {type: String, required: true}
    }),

    User: new mongoose.Schema({
        user_id: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        usertype: {type: mongoose.ObjectId, required: false},
        contact: [{phone: Number, email: String}],
        created_at: {type: Date, default: Date.now}
    }),

    Company: new mongoose.Schema({
        user_id: {type: String, required: true},
        name: {type: String, required: true, unique: true},
        ship_fee: {type: Number, required: true, default: 0},
        single_order: {type: Boolean, required: true, default: false},
        address: {type: String}
    }),

    Branch: new mongoose.Schema({
        name: {type:String, required:true},
        code: {type:String},
        created_at: {type: Date, default: Date.now},
        user_id: {type: String, required: true},
        company: {type: mongoose.ObjectId, required: true},
        activeyn: {type: Boolean, required: true, default: true}
    }),

    Category: new mongoose.Schema({ 
        name: {type:String, required:true},
        activeyn: {type: Boolean, required: true, default: true}
    }),

    Product: new mongoose.Schema({
        name: {type:String, required:true},
        category: {type: mongoose.ObjectId, required: false}, 
        price: {type:Number, required:true, default: 0},
        stock: {type:Number, required:true, default: 1},
        sku: {type:String, required:false},
        specification: [{key: String, value: String, price: Number, multi: Boolean}],
        short_description: {type: String},
        description: {type: String},
        image: [{path: String}],
        created_at: {type: Date, default: Date.now},
        company: {type: mongoose.ObjectId, required: true},
        branch: {type: mongoose.ObjectId, required: false},
        user_id: {type: String, required: true},
        visibility: [{type: String, enum: ['catelog', 'search'], required: true, default: ['catelog', 'search']}],
        activeyn: {type: Boolean, required: true, default: true},
        keywords: {type: String}
    }),
    
    Deal: new mongoose.Schema({
        products: [{type: mongoose.ObjectId, required: true}],
        price: Number,
        image: [{path: String}],
        activeyn: {type: Boolean, required: true, default: true}
    }),
    
    Coupons: new mongoose.Schema({
        product: {type: mongoose.ObjectId, required: true},
        code: String,
        price: Number,
        sale_price: Number,
        qty: Number,
        activeyn: {type: Boolean, required: true, default: true}
    }),
    
    Customer: new mongoose.Schema({
        user_id: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: [{address: {type: String, required: true}, tag: String}],
        activeyn: {type: Boolean, required: true, default: true}
    }),
    
    Basket: new mongoose.Schema({
        customer: {type: mongoose.ObjectId, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        address: {type: String, required: true},
        ship_fee: {type: Number, required: true},
        total: {type: Number, required: true},
        items: [{
            product: {type: mongoose.ObjectId, required: true},
            company: {type: mongoose.ObjectId, required: true},
            qty: {type: Number, required: true}, 
            price: {type: Number, required: true},
            status: {type: String, required: true, default: 'PENDING'}
        }],
        status: {type: String, required: true, default: 'PENDING'}
    })
}