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

exports.makeStringify = (obj, keys=[]) => {
    keys.forEach((key) => {
        if(obj.hasOwnProperty(key)){
            obj[key] = JSON.stringify(obj[key])
        }
    })
    return obj
}

exports.transformFields = (obj, fields = {}) => {
    Object.keys(fields).forEach((key) => {
        if(obj.hasOwnProperty(key)){
            obj[key] = obj[fields[key]]
        }
    })
    return obj
}