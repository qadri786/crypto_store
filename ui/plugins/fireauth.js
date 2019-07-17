import { auth } from '@/service/fireinit.js'
import Cookie from 'js-cookie'
import session from "localStorage";
import axios from "axios";

export default context => {
    const {store, route} = context
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if(user){
                user.getIdToken(true).then((token) => {
                    store.commit('user/setUser', token)
                    Cookie.set("cs_user", token)
                    session.setItem("cs_user", token)
                    const {respIsAdmin} = axios.get("http://localhost/api/user/check", { headers: {"Authorization": "key=" + token} }).catch((err) => {});
                    if(respIsAdmin !== undefined){
                        if(typeof respIsAdmin.data !== 'undefined' && typeof respIsAdmin.data._id !== 'undefined'){
                            store.commit("user/setAdminUser", true)      
                            session.setItem("cs_admin", true)
                        }
                    }else{
                        return resolve()    
                    }
                    return resolve()
                })
            }
            store.commit('user/setUser', null)
            Cookie.remove("cs_user")
            session.removeItem("cs_user")
            return resolve()
        })
    });
}