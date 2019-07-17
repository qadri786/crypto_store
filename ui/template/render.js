const mustache = require("mustache");
const fs = require("fs");

fs.readFile("order.mst",(err, data) => {
    if(!err){
        fs.writeFile("order.html", mustache.to_html(data.toString(), {"id": "asdasdsad", "items": [{"name": "ABC", "qty": "2", "price": "500"}], "ship": 200, "total": 1200}));
    }
});