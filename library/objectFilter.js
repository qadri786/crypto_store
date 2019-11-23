exports.excludeOthers = (obj, keys=[]) => {
    if(Array.isArray(obj)){
        return Object.assign({}, obj).map((item) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                }else{
                    delete item[key];
                }
            });
            return item;
        });
    }else{
        return [Object.assign({}, obj)].map((item) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                }else{
                    delete item[key];
                }
            });
            return item;
        });
    }
}


exports.removeFromObject = (obj, keys=[]) => {
    if(Array.isArray(obj)){
        return Object.assign({}, obj).map((item) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                    delete item[key];
                }
            });
            return item;
        });
    }else{
        return [Object.assign({}, obj)].map((item) => {
            keys.forEach((key) => {
                if(item.hasOwnProperty(key)){
                    delete item[key];
                }
            });
            return item;
        });
    }
}

