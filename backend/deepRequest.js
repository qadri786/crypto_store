// Product => Model.Product
exports.withSKU = (product, req, res) => {
    product.getOne({sku: req.body.sku, user_id: req.headers.user_id}, (err, doc) => {
        if(err) res.status(500).json({"error": err.message});
        if(doc){
            res.status(404).json({"error": "Item already found"});
        }else{
            product.insert({
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
            },(err, doc) => {
                if(err) {
                    res.status(500).json({"error": err.message});
                }else{
                    res.json({"message": "inserted", "id": doc._id});
                }
            });
        }
    });
};

exports.withoutSKU = (product, req, res) => {
    product.insert({
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
    },(err, doc) => {
        if(err) {
            res.status(500).json({"error": err.message});
        }else{
            res.json({"message": "inserted", "id": doc._id});
        }
    });
};

exports.companyCreate = (company, req, res) => {
    try{
        company.insert({ name: req.body.company, address: req.body.address, user_id: req.headers.user_id }, (err, doc) => {
            if(err) res.status(500).json({"error": err.message});
            res.json({"message": "Registered"});
        })
    }catch(err){
        res.status(500).json({"error": err.message});
    }
};

exports.deepInsert = (product, data, req, res) => {
    try{
        product.getCollection().insertMany(d, (err, docs) => {
            if(err){
                res.status(500).json({"error": err});
            }else{
                res.status(200).json({"message": "data has been imported"});
            }
        });
    }catch(err){
        res.status(500).json({"error": err});
    }
    

}