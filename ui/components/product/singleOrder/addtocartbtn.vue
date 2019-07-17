<template>
    <v-container>
        <v-dialog v-model="dialog" min-height="200" width="500" persistent hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn v-if="path == 'fab'" absolute fab top right color="primary" title="Buy now" v-on="on"><v-icon>shopping_basket</v-icon></v-btn>    
                <v-btn v-if="path == 'link'" block color="primary" title="Buy now" v-on="on"><v-icon>shopping_basket</v-icon>Buy now</v-btn>    
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Place an order</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items v-if="user">
                    <v-btn dark flat @click="add">submit</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-layout column v-if="user" px-3>
                    <v-flex xs12>
                        <v-text-field type="text" v-model="customer.name" label="Name" disabled />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field type="text" v-model="customer.email" label="Email" disabled />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field type="text" v-model="customer.phone" label="Phone" disabled />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field type="text" v-model="address" label="Address" value="" />
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field type="number" min="1" v-model="qty" label="Qty" />
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea v-model="info" label="Additional Information" value="" />
                    </v-flex>
                </v-layout>
                <v-layout v-if="!user" px-3>
                    <v-flex>
                        <v-btn color="blue" large block @click="fb_login">Facebook</v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-dialog>
    </v-container>
    
</template>
<script>
import func from '@/mixin/func';
import axios from 'axios';
export default {
    props: {
        path: {type: Array, required: true},
        items: {type: Array, required: true},
        user: {type: String}
    },

    mounted(){
        if(this.user){
            axios.get("http://" +  (process.server ? "127.0.0.1:3000" : "thesmartstore.pk") + "/api/customer", {headers:{"Authorization": "key="+this.user}})
            .then((resp) => { 
                if(resp.data.id === "register"){
                    this.$router.push("/user/profile");
                }   
                this.customer = resp.data;
            })
            .catch((err) => {})
        }
    },

    data(){
        return{
            dialog: false,
            customer: {},
            address: "",
            qty: 1,
            info: "",
        }
    },
    methods: {
        fb_login: function(){
            this.signIn({
            provider: "facebook", 
            callback: (resp) => {
                setTimeout(() => {
                window.location.reload(true);
                }, 1000)
                
            },
            callbackErr: (err) => {
                this.alertType = "error"
                this.alertText = "invalid login argument";
                }
            });
        },
        add: function(e){
            axios.post("/api/customer/order", {
                customer_id: this.customer,
                email: this.customer.email,
                phone: this.customer.phone,
                address: this.address,
                ship_fee: 200,
                total: this.items[0].price * this.qty,
                items: this.items.map((item) => { return { "product": item._id, "name": item.name, "price": item.price, "qty": this.qty, "company": item.company }; })
            }, {"Content-Type": "application/json", headers:{"Authorization": "key="+this.$store.state.user.currentUser}}).then((resp) => {
                this.dialog = false;
                alert(resp.data);
            }).catch(err => console.log(err.response.data));
        }
    },
    mixins: [func]
}
</script>
<style scoped>

</style>
