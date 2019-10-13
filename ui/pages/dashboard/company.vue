<template>
    <form-layout title="Company">
        <v-form slot="content" class="pl-2 pr-2">
            <v-btn color="primary" flat title="go back" :nuxt="true" :to="'/dashboard'" value="right"><v-icon>arrow_back</v-icon> Go back</v-btn>
            <v-text-field v-model="name" type="text" label="Name" />
            <v-text-field v-model="address" type="text" label="Address" />
            <v-text-field type="number" min="100" v-model="ship_fee" label="Shipping Fees" />
            <v-checkbox v-model="single_order" label="Single Order"></v-checkbox>
        </v-form>
        <div slot="action">
            <v-btn primary large @click.prevent="btnSave">Save</v-btn>
        </div>
        <v-snackbar :top="true" :right="true" timeout="6000" v-model="alert">{{message}}</v-snackbar>
    </form-layout>
</template>
<script>
import backform from "@/helper/backform"
import func from "@/mixin/func"
import axios from 'axios';

export default {
    components: {
        formLayout: backform
    },
    meta: {
        requireAuth: true
    },
    methods:{
        btnSave: function() {
            this.postData("/api/company", {"name": this.name, "address": this.address, "ship_fee": this.ship_fee, "single_order": this.single_order}, {"Content-Type": "application/json", headers:{"Authorization": "key=" + this.$store.state.user.currentUser}}, (resp) => { 
                alert("save");
                this.$router.push("/dashboard");
            },(err) => {
                alert("Company name already exist");
            });
        }
    },
    asyncData: ({store}) => {
        return axios.get("http://" + (process.server ? "api:3000" : "localhost") + "/api/user/company",{ headers: {"Authorization": "key=" + store.state.user.currentUser} })
        .then((resp) => {
            return {
                name: resp.data.name,
                address: resp.data.address,
                ship_fee: resp.data.ship_fee,
                single_order: resp.data.single_order,
                message: "", alert: false
            }    
        }).catch((err) => {
            return {
                name: "",
                address: "",
                message: "", alert: false
            }
        })
    },

    mixins: [func]
}
</script>
<style scoped>

</style>
