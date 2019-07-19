// Extending express for handleing requests
const models = require("./models");
const utils = require("./utils");
const deepRequest = require("./deepRequest");
const csvtojson = require("csvtojson");
// Initailizing Awesome model for serving product.
const product = new models("Product");
const category = new models("Category");
const company = new models("Company");
const user = new models("User");
const customer = new models("Customer");
const basket = new models("Basket");

exports.checkUser = (req, res) => {
    user.getOne({"user_id": req.headers.user_id}, (err, doc) => {
        if(err){
            res.status(404).json({"error": "User not found"});
        }else{
            if(doc == null){
                res.status(404).json({"error": "User not found"});
            }else{
                res.status(200).json(doc);
            }
        }
    })
}

exports.userValid = (req, res) => {
    if(req.body.email && req.body.company){
        let error = "valid";
        let emailError = "";
        let companyError = "";
        user.getOne({"email": req.body.email}, (err, doc) => {
            if(err){
                res.status(500).json({"error": [err.message]});
            }else{
                if(doc){
                    emailError = "email already exists"
                }
            }
            company.getOne({"name": req.body.company}, (err, doc) => {
                if(err){
                    res.status(500).json({"error": err.message});
                }else{
                    if(doc){
                        companyError = "company already exists";  
                        res.status(404).json({"error": [emailError, companyError]})
                    }else{
                        if(emailError !== ""){
                            res.status(404).json({"error": [emailError]})
                        }
                        res.status(200).json({"message": error});
                    }
                }
            })
        })
    }
}

exports.userRegistration = (req, res) => {
    user.insert({
        user_id: req.headers.user_id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }, (err, doc) => {
        if(err) {
            res.status(500).json({"error": err.message});
        }else{
            // send an email for welcome
            deepRequest.companyCreate(company, req, res);
            // res.json({"message": "Registered"});
        }
    })
};

exports.customerRegistration = (req, res) => {
    customer.getOne({user_id: req.headers.user_id}, (err, doc) => {
        if(err){
            res.status(500).json({"error": err.message});
        }
        if(doc){
            customer.update({name: req.body.name, email: req.body.email, phone: req.body.phone,}, {user_id: req.headers.user_id}, (err, doc) => {
                if(err) {
                    res.status(500).json({"error": err.message});
                }else{
                    // send an email for welcome
                    res.json({"message": "Registered"});
                }
            })
        }else{
            customer.insert({
                user_id: req.headers.user_id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }, (err, doc) => {
                if(err) {
                    res.status(500).json({"error": err.message});
                }else{
                    // send an email for welcome
                    res.json({"message": "Registered"});
                }
            });
        }
    })
    

};


exports.categoryProduct = (req, res) => {
    product.getCollection().find({"activeyn": true, "category": req.params.category}).populate({path: "company", model: company.getCollection()}).exec((err, docs) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(docs);
    });
}

exports.categoryGet = (req, res) => {
    category.get((err, docs) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(docs);
    });
};

// To get all product documents
exports.productGet = (req, res) => {
    product.getCollection().find({"activeyn": true}).populate({path: "company", model: company.getCollection()}).exec((err, docs) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(docs);
    });
};

exports.productUser = (req, res) => {
    product.getCollection().find({user_id: req.headers.user_id}).populate({path: "company", model: company.getCollection()}).exec((err, docs) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(docs);
    });
};

// To get only filtered and first record
exports.productGetOne = (req, res) => {
    product.getCollection().findOne({"_id": req.params.id, "activeyn": true}).populate([{path: "company", model: company.getCollection()},{path: "category", model: category.getCollection()}]).exec((err, doc) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(doc);
    });
};

exports.uploadProducts = (req, res) => {
    csvtojson().fromString(req.files.csv.data.toString()).then((rows) => {
        let data = rows.filter((item) => {
            return item.name != "" && item.name != undefined && item.name != null
        });
        res.status(200).json(data);
    });
}

exports.importProducts = (req, res) => {    
    deepRequest.deepInsert(product, req.body, req, res);
}; 

// To create new product document
exports.productCreate = (req, res) => {
    if(req.body.sku != ""){
        deepRequest.withSKU(product, req, res);
    }else{
        deepRequest.withoutSKU(product, req, res);
    }
    // product.getOne({sku: req.body.sku, user_id: req.headers.user_id}, (err, doc) => {
    //     if(err) res.status(500).json({"error": err.message});
    //     if(doc){
    //         res.status(404).json({"error": "Item already found"});
    //     }else{
    //         product.insert({
    //             name: req.body.name,
    //             category: req.body.category_id,
    //             sku: req.body.sku,
    //             price: req.body.price,
    //             stock: req.body.stock,
    //             visibility: req.body.visibility,
    //             specification: req.body.specification,
    //             short_description: req.body.short_description,
    //             description: req.body.description,
    //             company: req.body.company_id,
    //             user_id: req.headers.user_id,
    //             activeyn: req.body.status,
    //         },(err, doc) => {
    //             if(err) {
    //                 res.status(500).json({"error": err.message});
    //             }else{
    //                 res.json({"message": "inserted", "id": doc._id});
    //             }
    //         });
    //     }
    // });
};

exports.productModify = (req, res) => {
    try{
        product.update({
            name: req.body.name,
            category: req.body.category_id,
            sku: req.body.sku,
            price: req.body.price,
            stock: req.body.stock,
            visibility: req.body.visibility,
            specification: req.body.specification,
            short_description: req.body.short_description,
            description: req.body.description,
            company: req.body.company_id,
            user_id: req.headers.user_id,
            single_order: req.body.single_order,
            activeyn: req.body.status,
        },{"_id": req.params.id}, (err, doc)=>{
            if(err) res.status(500).json({"error": err.message});
            res.json(doc);
        });
    }catch(err){
        res.json({"error": "An error occurs"})
    }
};

exports.productDelete = (req, res) => {
    product.delete({"_id": req.params.id}, (err, doc) => {
        if(err) res.status(500).json({"error": err.message});
        res.json({"message": "deleted"})
    })
}


// To upload files 
exports.productUpload = (req, res) => {
    try{
        product.update({image: req.files.map((file) => {return {path: "".concat(file.path) };})},{"_id": req.params.id}, (err, doc)=>{
            if(err) res.status(500).json({"error": err.message});
            res.json(doc);
        });
    }catch(err){
        res.json({"error": "An error occurs"})
    }  
};

exports.companyGet = (req, res) => {
    company.get((err, docs) => {
    if(err) res.status(500).json({"error": err.message});
        res.json(docs);
    });
};

exports.companyGetByUser = (req, res) => {
    company.getOne({"user_id": req.headers.user_id}, (err, doc) => {
        if(err){
            res.status(500).json({"error": err.message});
        }
        if(doc){
            res.json(doc);
        }else{
            res.status(404).json({"error": "Not Found"});
        }
    });
};

// To get only filtered and first record
exports.companyGetOne = (req, res) => {
    company.getOne({"_id": req.params.id}, (err, doc) => {
        if(err) res.status(500).json({"error": err.message});
        res.json(doc);
    });
};

exports.companyCreate = (req, res) => {
    try{
        company.getOne({user_id: req.headers.user_id}, (err, doc) => {
            if(err) res.status(500).json({"error": err.message});
            if(doc){
                company.update({name: req.body.name, address: req.body.address, ship_fee: req.body.ship_fee, single_order: req.body.single_order}, {"_id": doc._id},(err, doc) => {
                    if(err) res.status(500).json({"error": err.message});
                    res.json({"message": "updated", "id": doc._id});
                });

            }else{
                company.insert({ name: req.body.name, address: req.body.address, user_id: req.headers.user_id }, (err, doc) => {
                    if(err) res.status(500).json({"error": err.message});
                    res.json({"message": "inserted", "id": doc._id});
                })
            }
        })
        

    }catch(err){
        res.status(500).json({"error": err.message});
    }
};

exports.customerOrder = (req, res) => {
    try{
        basket.insert({
            customer: req.body.customer_id,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            ship_fee: req.body.ship_fee,
            total: req.body.total,
            items: req.body.items
        }, (err, doc) => {
            
            if(!err){
                // sending email to customer and Owner of site
                let d = new Date();
                customer.getOne({"_id": doc.customer}, (err, cust) => {
                    utils.template("invoice", {
                        "id": doc._id,
                        "customer_name": cust.name,
                        "customer_email": doc.email,
                        "customer_mobile": doc.phone,
                        "items": req.body.items,
                        "ship": doc.ship_fee,
                        "net_total": doc.total,
                        "total": doc.total + doc.ship_fee,
                        "current_date": d.toDateString()
                    }, (html) => {
                        utils.mail(doc.email, "Order#" + doc._id, "", html);
                        utils.mail("info@netsolonline.com", "Order#" + doc._id, "", html);
                        res.json({"message": "Order has been sent !"});
                    });
                });
            }else{
                res.status(500).json({"error": err.message});
            }
        })
    }catch(err) {
        res.status(500).json({"error": err.message});
    }
    
};

exports.customerById = (req, res) => {
    customer.getOne({"user_id": req.headers.user_id}, (err, doc) => {
        if(err) {
            res.status(500).json({"error": err.message});
        }
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(200).json({"id": "register"});
        }
    })
};

exports.orderTracking = (req, res) => {
    company.getOne({"user_id": req.headers.user_id}, (err, doc) => {
        let company_id = "";
        if(!err){
            if(doc){
                company_id = doc._id;
                basket.getCollection()
                .find({"items.company": company_id})
                .populate({"path": "items.product", model: product.getCollection(), select: ["_id", "name"]})
                .select(["items"]).exec((err, docs) => {
                    if(!err){
                        if(docs){
                            let items = []
                            docs.forEach(doc => {
                                doc.items.forEach(item => { 
                                    if(item.company.toString() == company_id){
                                        let itemIndex = items.findIndex((obj) => { return obj.product._id == item.product._id  })
                                        if(itemIndex > -1){
                                            items[itemIndex].qty += item.qty
                                        }else{
                                            items.push(item); 
                                        }
                                    }
                                 });
                            });
                            res.status(200).json(items);
                        }else{
                            res.status(200).json([]);    
                        }
                    }else{
                        res.status(500).json({"error": err.message});        
                    }
                });
            }else{
                res.status(200).json([]);
            }
        }else{
            res.status(500).json({"error": err.message});
        }
    })
}