<template>
    <v-container px-0 py-0 fluid fill-height>
        <v-layout column>
            <v-flex>
                <h3>We're serveing</h3>
                <CategoryGroup :items="categories"></CategoryGroup>
            </v-flex>
            <v-flex>
                <v-layout column>
                    <v-flex>
                        <h3>Featured</h3>
                        <product-item v-for="(item, key) in featuredItems" v-bind:key="key" v-bind:item="item" />
                    </v-flex>
                    <v-flex>
                        <h3>Featured</h3>
                    </v-flex>
                </v-layout>
                
                
            </v-flex>
        <!--  -->
        </v-layout>
  </v-container>
</template>

<script>
import func from '@/mixin/func';
import CategoryGroup from "~/components/category/ItemGroup.vue"
import productItem from "~/components/product/item.vue"

export default {
    mixins:[func],
    components: {
        productItem, CategoryGroup
    },
    mounted(){
        this.getData("/api/category").then((resp) => {
            this.categories = resp.data;
        }).catch(err => console.log(err.response.data));
    },

    data(){
        return {
            categories: [],
            featuredItems: [{_id: "", name: "abc", price: 0.00, company:{name: "abc"}, description: "", image:[{path: "//placehold.it/200?text=no-image"}]}],
            items: [],
            page: 0,
        }
    },
    methods: {
        getMenu(){

        }
    }
}
</script>

<style>

</style>
