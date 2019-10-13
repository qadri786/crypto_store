<template>
<v-layout row wrap>
    <v-flex md8 mr-2>
        <v-data-table class="xs12" v-bind:headers="header" v-bind:items="items">
            <template v-slot:items="props">
                <th>
                    <v-layout row wrap>
                        <v-flex xs12>{{props.item.item}}</v-flex>
                        <v-flex><img src="//placehold.it/128" /></v-flex>
                    </v-layout>
                </th>
                <td>
                    {{props.item.price}}
                </td>
                <td>
                    {{props.item.qty}}
                </td>
            </template>
        </v-data-table>
    </v-flex>
    <v-flex md3>
        <v-card>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Shipping & Billing</h3>
                </div>
            </v-card-title>
            <v-card-text>
                <shipping :customer="customer" :total="myTotal.total" :ship="ship" :items="items" />
            </v-card-text>
        </v-card>
    </v-flex>
</v-layout>   
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex';
import shipping from '@/components/product/checkoutshipping.vue'
export default {
    components:{
        shipping
    },
    meta: {
        requireAuth: true
    },

    computed:{
      ...mapGetters({
        myTotal: 'basket/totalBasket'
      })
    },

    asyncData({store, redirect}){
        return axios.get("http://" + (process.server ? "api:3000" : "localhost") + "/api/customer", {headers:{"Authorization": "key="+store.state.user.currentUser}})
        .then((resp) => {
            if (resp.data.id === "register"){
                redirect("/user/register")
            }else{
                return {
                    customer: resp.data
                }
            }
        }).catch((err) => {})

        
    },

    data(){
        return {
            ship: 200,
            items: this.$store.state.basket.list.map((item) => { return {"id": item.id, "name": item.name, "price": item.price, "qty": item.qty, "company": item.company};  }),
            header: [
                {text: "Item", value: "item"},
                {text: "Price", value: "price"},
                {text: "Qty", value: "qty"},
            ],
        }
    },
}
</script>

<style scoped>

</style>
