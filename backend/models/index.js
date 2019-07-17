const mongoose = require("mongoose");
const models = require("./models");
 // Awesome !! Document Population model
const model = function(modelName){
    this.mName = modelName;
    this.collection = mongoose.model(modelName.toLowerCase(), models[modelName]);
    
    this.get = function(fn){
        this.collection.find({}, fn);
    }

    this.getBy = function(params = {}, fn){
        this.collection.find(params, fn);
    }
    
    this.getOne = function(params = {}, fn){
        this.collection.findOne(params, fn);
    }

    this.insert = function(params = {}, fn){
        this.collection.create(params, fn)
    }

    this.update = function(params = {}, clause = {}, fn){
        this.collection.findOneAndUpdate(clause, params,fn);
    }

    this.delete = function(params = {}, fn){
        this.collection.deleteOne(params, fn);
    }

    this.getCollection = function(){
        return this.collection;
    }
}

module.exports = model;