<template>
    <v-container v-if="!$store.state.user.isAdmin">        
        <v-btn v-if="path == 'fab'" absolute fab top right color="primary" title="Add to cart" @click="add"><v-icon>add_shopping_cart</v-icon></v-btn>    
        <v-btn v-if="path == 'link'" block color="primary" title="Add to cart" @click="add"><v-icon>add_shopping_cart</v-icon> Add to Cart</v-btn>    
    </v-container>
</template>
<script>
export default {
    props: {
        id: {type: String, required: true},
        name: {type: String, required: true},
        path: {type: String, required: true},
        qty: {type: Number, required: true},
        price: {type: Number, required: true},
        company: {type: String, required: true}
    },

    data(){
        return{
            isUser: false,
            isUserCheck: false
        }
    },
    methods: {
        add: function(e){
            this.$store.commit("basket/addToBasket", {id: this.id, name: this.name, price: this.price, qty: this.qty, company: this.company});
        }
    }
}
</script>
<style scoped>

</style>
