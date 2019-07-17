export default function({store, route, redirect}){
    if(isDashboard(route)){
        route.meta.some(record => {
            record.requireAuth === true && !store.state.user.currentUser ? redirect("/dashboard/user/login") : ""        
        });
    }else{
        route.meta.some(record => {
            record.requireAuth === true && !store.state.user.currentUser ? redirect("/user/login") : ""        
        });
    }
}

function isDashboard(route){
    if (route.matched.some(record =>  record.path.includes('dashboard'))) {
        return true
    }else{
        return false
    }
}