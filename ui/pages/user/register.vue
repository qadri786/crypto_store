<template>
    <v-container>
        <v-layout row wrap>
            <v-flex>
                <alert :type="alertType" :text="alertText"></alert>
                <v-card flat>
                    <v-card-title><h3 class="headline mb-0">Register</h3></v-card-title>
                    <v-text-field v-model="name" label="Name" />
                    <v-text-field v-model="email" type="email" label="Email Address" />
                    <v-text-field v-if="!$store.state.currentUser" v-model="password" type="password" label="Password" />
                    <v-text-field v-model="phone" mask="+############" label="Phone" />
                    <v-card-actions>
                        <v-btn color="primary" large block @click="onRegisterBtnClicked">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import func from "@/mixin/func.js"
import Alert from "@/components/Alert"
export default {
    components: {
        Alert
    },
    data(){
        return {
            name: "", email: "", password: "", phone: "",
            alertType: "info", alertText: ""
        }
    },
    methods:{
       onRegisterBtnClicked: function(){
           if(this.$store.state.currentUser !== ""){
                this.postData("/api/customer/register", 
                {name: this.name, email: this.email, phone: this.phone }, 
                {"Content-Type": "application/json", 
                headers: { "Authorization": "key=" + this.$store.state.user.currentUser}
                }, (response) => {
                    setTimeout(() => {
                        window.location = "/checkout";
                    },1000)
                    
                })
           }else{
            this.signUp({
                provider: "email",
                email: this.email,
                password: this.password,
                callback: (resp) => {
                    resp.user.getIdToken(true).then((token) => {
                        this.postData("/api/customer/register", 
                        {name: this.name, email: this.email, phone: this.phone }, 
                        {"Content-Type": "application/json", 
                        headers: { "Authorization": "key=" + token}
                        }, (response) => {
                            this.alertType = "success";
                            this.alertText = response.data.message;
                            setTimeout(() => {
                                window.location = "/checkout";
                            }, 1000)
                            
                        })
                    }); 
                },
                callbackErr: () => {
                    this.alertType = "error"
                    this.alertText = "Something went wrong"
                }
            })
           }
           

       }
    },
    mixins: [func]
}
</script>

<style>

</style>
