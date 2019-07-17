<template>
    <v-container>
        <v-layout row wrap>
            <v-flex>
                <alert :type="alertType" :text="alertText"></alert>
                <v-card flat class="px-5">
                    <v-card-title><h3 class="headline mb-0">Register</h3></v-card-title>
                    <v-text-field ref="name" v-model="name" label="Name" :rules="[rules.required, rules.charLength]" />
                    <v-text-field ref="email" v-model="email" type="email" label="Email Address" :rules="[rules.required, rules.email]" />
                    <v-text-field ref="password" v-model="password" type="password" label="Password" :rules="[rules.required, rules.charLength]" />
                    <v-text-field ref="phone" v-model="phone" mask="+############" label="Phone" :rules="[rules.required]" />
                    <v-text-field ref="company" v-model="company" label="Company" :rules="[rules.required]"/>
                    <v-text-field ref="address" v-model="address" label="Company address" />
                    <v-card-actions>
                        <v-btn color="primary" large block @click="onRegisterBtnClicked">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
        <v-flex>
          <v-btn color="primary" large block :nuxt="true" :to="'/dashboard/user/login'">Already seller?</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import func from "@/mixin/func.js"
import Alert from "@/components/Alert"
import axios from "axios";
export default {
    components: {
        Alert
    },
    data(){
        return {
            rules: {
                required: value => !!value || 'This is required field',
                charLength: value => value.length > 5 || 'Max 6 Charecters required',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
               
            },
            name: "", email: "", password: "", phone: "", company: "", address: "",
            alertType: "info", alertText: ""
        }
    },
    computed: {
        form(){
            return {name: this.name, email: this.email, password: this.password, phone: this.phone, company: this.company, address: this.address}
        }
    },
    methods:{
        onRegisterBtnClicked: function(){
           let isError = false;
           Object.keys(this.form).forEach(field => {
               if(!this.form[field]){
                   isError = true
               }
               this.$refs[field].validate(true)
           });
           if(!isError){
               axios.post("/api/user/register/check", {email: this.email, company: this.company})
               .then(() => {
                    this.signUp({
                        provider: "email", email: this.email, password: this.password,
                        callback: (resp) => {
                            resp.user.getIdToken(true).then((token) => {
                            axios.post("/api/user/register", 
                            {name: this.name, email: this.email, phone: this.phone, company: this.company, address: this.address },
                            {"Content-Type": "application/json", headers: { "Authorization": "key=" + token}})
                            .then((resp) => {
                                this.$router.push("/dashboard");
                            })
                            .catch((err) => {
                                this.alertType = "error"
                                this.alertText = err.response.data.error;
                            });
                            }); 
                        },
                        callbackErr: (err) => {
                            this.alertType = "error"
                            this.alertText = err.response.data.message == "EMAIL_EXISTS" ? "Email already exists" : "Something went wrong"
                        }
                    })
               })
               .catch((err) =>{
                    this.alertType = "error"
                    this.alertText = err.response.data.error.forEach(err => {
                        alert(err);
                        return err + "<br />";
                    }); 
               })
                
           }
           
       }
    },
    mixins: [func]
}
</script>

<style>

</style>
