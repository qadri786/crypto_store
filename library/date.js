exports.dateCompCurrent = (date, compOpt = 'gte') => {
    let currentTime = new Date();
    let paramDate = new Date(date);
    switch(compOpt){
        case 'gte':
            return paramDate.getTime() >= currentTime.getTime()
        case 'lte':
            return paramDate.getTime() <= currentTime.getTime()
        case 'gt':
            return paramDate.getTime() > currentTime.getTime()
        case 'lt':
            return paramDate.getTime() < currentTime.getTime()
        default:
            return paramDate.getTime() >= currentTime.getTime()
    }
}


exports.dateComp = (date1, date2, compOpt = 'gte') => {
    let currentTime = new Date(date1);
    let paramDate = new Date(date2);
    switch(compOpt){
        case 'gte':
            return paramDate.getTime() >= currentTime.getTime()
        case 'lte':
            return paramDate.getTime() <= currentTime.getTime()
        case 'gt':
            return paramDate.getTime() > currentTime.getTime()
        case 'lt':
            return paramDate.getTime() < currentTime.getTime()
        default:
            return paramDate.getTime() >= currentTime.getTime()
    }
}

exports.getCurrentDay = () => {
    let paramDate = new Date();
    switch(paramDate.getDay()){
        case 0:
            return "sunday";
        case 1:
            return "monday";
        case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thursday";
        case 5:
            return "firday";    
        case 6:
            return "saturday";
        default:
            return;
    }
}