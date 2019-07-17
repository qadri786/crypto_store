<template>
    <v-container px-0 py-0 fluid fill-height>
        <v-layout column>
        <v-flex py-2>
            <v-tabs @change="tabChange" dark grow centered v-model="page">
            <v-tab v-for="(item, key) in tabs" :key="key">{{item.name}}</v-tab>
            <v-menu v-if="more.length">
                <template v-slot:activator="{ on }">
                <v-btn flat v-on="on">More</v-btn>
                </template>
                <v-list>
                <v-list-tile v-for="(item, key) in more" :key="key">
                    <v-tab>{{ item.name }}</v-tab>
                </v-list-tile>
                </v-list>
            </v-menu>
            </v-tabs>
        </v-flex>
        <v-flex>
            <v-container grid-list-xs>
                <v-layout wrap>
                    <productItem v-for="(item, key) in items" v-bind:key="key" v-bind:item="item" />
                </v-layout>
            </v-container>
        </v-flex>
        <!-- <product-item v-for="(item, key) in products" v-bind:key="key" v-bind:item="item" /> -->
        </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import productItem from "~/components/product/item.vue"

export default {
    components: {
        productItem
    },
    mounted(){
        axios.get("/api/category")
        .then(resp => {
            let max = 3;
            resp.data.map((item, index) => {
                if(index +1  <= max){
                    this.tabs.push(item);
                }else{
                    this.more.push(item);
                }
            })
            this.getTab() 
        })
        .catch(err => console.log(err.response))
    },

    data(){
        return {
            tabs:[],
            more:[],
            items: [],
            page: 0,
        }
    },
    methods: {
        tabChange(e){
            this.page = e;
            this.getTab();
        },
        getTab(){
            this.items = [];
            let m = this.tabs.concat(this.more);
            axios.get("/api/product/category/" + m[this.page]._id)
            .then(resp => {
                resp.data.map((item, index) => {
                    this.items.push(item);
                })
            })
        },
    }
}
</script>

<style>

</style>
