<template>
    <v-item-group>
        <v-container grid-list-md>
            <v-layout wrap>
                <v-flex v-for="(item, key) in items" :key="key" xs12>
                    <v-card flat :elevation="5">
                        <v-card-title>
                            <h3 class="headline mb-0">{{item.name}}</h3>
                            <v-divider></v-divider>
                            <h3 class="subheadline mb-0">Rs. {{item.price}}</h3>
                        </v-card-title>
                        <v-card-actions>
                            <v-text-field type="number" min="1" label="Qty" :data-id="item.id" :value="item.qty" @keyup="updateItem" />        
                            <v-btn icon color="primary" @click="removeItem(item.id)"><v-icon>remove_shopping_cart</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-item-group>
</template>    
<script>
export default {
    props: {
        items:{ type: Array, required: true }
    },
    methods: {
        removeItem(id){
            this.$store.commit("basket/removeFromBasket", id);
        },
        updateItem(e){
            if(e.target.value !== ""){
                this.$store.commit("basket/updateQty", {id: e.target.dataset.id, qty: parseInt(e.target.value)});
            }
        }
    }
}
</script>
<style scoped>

</style>
