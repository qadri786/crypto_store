<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs-12>
                <h3>Ship to</h3>    
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs-12>
                <v-textarea v-model="address"></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-text-field mask="+############" label="Phone" v-model="phone"></v-text-field>
        </v-layout>
        <v-layout row wrap>
            <v-text-field label="Email" v-model="email"></v-text-field>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
            <v-flex>
                <h3 class="headline mb-0">Order Summary</h3>
                <div>Sub Total ({{ items.length }} item(s)): <span class="primary--text">Rs. {{total}}</span></div>
                <div>Shipping Fee: <span class="primary--text">Rs. {{ship}}</span></div>
                <div class="primary--text">
                    <h3>Total: {{ grandTotal }}</h3>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs-12>
                <v-btn color="primary" block @click="btnOrder">Place Order</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        customer: {type: Object, required: true},
        total: {type: Number, required: true},
        ship: {type: Number, required: true},
        items: { required: true }
    },
    computed: {
        grandTotal: function(){
            return this.total + this.ship;
        }
    },
    methods:{
        btnOrder: function(){
            axios.post("/api/customer/order", {
                customer_id: this.customer,
                email: this.email,
                phone: this.phone,
                address: this.address,
                ship_fee: this.ship,
                total: this.total,
                items: this.items.map((item) => { return { "product": item.id, "name": item.name, "price": item.price, "qty": item.qty, "company": item.company }; })
            }, {"Content-Type": "application/json", headers:{"Authorization": "key="+this.$store.state.user.currentUser}}).then((resp) => {
                this.$store.commit("basket/basketClear")
                alert(resp.data);
                setTimeout(() => {
                    window.location = "/"
                }, 2000)
            }).catch(err => console.log(err))
        }
    },
    data(){
        return {
            address: this.customer.address.length > 0 ? this.customer.address[0] : "",
            email: this.customer.email,
            phone: this.customer.phone,
        }
    }
}
</script>

<style scoped>
h3{
    border-bottom: solid #b71c1c !important;
}
</style>
