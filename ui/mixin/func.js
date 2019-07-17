import {http} from "@/service/http"
import {auth, FacebookProvider} from '@/service/fireinit';
export default {
    methods: {
        getData: function(url, header){
            return http.get(url, header);
        },
        postData: function(url, data, header, cb, cberr = err => console.log(err)){
            http.post(url, data, header).then(cb).catch(cberr);
        },

        signUp: function(options){
            if(options.provider == "email"){
                auth.createUserWithEmailAndPassword(options.email, options.password).then(options.callback).catch(options.callbackErr);
             }
        },

        signIn: function(options){
            if(options.provider == "email"){
                auth.signInWithEmailAndPassword(options.email, options.password).then(options.callback).catch(options.callbackErr);
             }
             if(options.provider == "facebook"){
                auth.signInWithPopup(FacebookProvider).then(options.callback).catch(options.callbackErr)
             }
        },
        
        signOut: function(){
            auth.signOut();
            this.$store.commit("user/setUser", "");
            this.$store.commit("user/setAdminUser", false);
            setTimeout(() => {
                window.location = "/"
            }, 100);
        },

        forgetPassword: function(options){
            auth.sendPasswordResetEmail(options.email).then(options.callback).catch(options.callbackErr);
        },

        getUser: function(){
            return this.$store.state.currentUser;
        }

    }
}