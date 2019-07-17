<template>
    <v-layout row wrap>
        <v-flex>
            <v-btn color="primary" flat title="go back" :nuxt="true" :to="'/dashboard'"><v-icon>arrow_back</v-icon> Go back</v-btn>
            <v-btn color="primary" flat title="Add New" :nuxt="true" :to="'/dashboard/product/new'" :right="true"><v-icon>add</v-icon> Add new</v-btn>
            <v-data-table class="xs12" v-bind:headers="header" v-bind:items="list">
                <template v-slot:items="props">
                    <td>{{props.item.name}}</td>                    
                    <td>{{props.item.price}}</td>
                    <td>
                        <share-view :id="props.item._id" :title="props.item.name" :description="props.item.description" />
                        <v-btn flat icon :nuxt="true" :to="'/dashboard/product/' + props.item._id">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn flat icon @click="btnDelete(props.item._id)">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>    
    
</template>
<script>
import shareView from '@/components/product/share.vue'
import func from "@/mixin/func"
import axios from 'axios'
export default {
    components: {
        shareView: shareView,
    },
    meta: {
        requireAuth: true
    },
    
    methods:{

        btnDelete: function(id){
            axios.delete("/api/product/" + id, { headers: {"Authorization": "key=" + this.$store.state.user.currentUser} })
            .then((resp) => {
                axios.get("/api/productGrid", { headers: {"Authorization": "key=" + this.$store.state.user.currentUser} }).then((resp) => {
                    this.list = resp.data;
                    this.isListLoaded = true;
                });
                alert("Deleted");
            })
            .catch((err) => {
                console.log(err);
                alert("An error occured");
            })
        }
    },
    asyncData({store, error, redirect}){
        return axios.get("http://" + (process.server ? "127.0.0.1:3000" : "localhost:3000") + "/api/user/company", { headers: {"Authorization": "key=" + store.state.user.currentUser} })
        .then((resp) => {
            return axios.get("http://" + (process.server ? "127.0.0.1:3000" : "localhost:3000") + "/api/productGrid", { headers: {"Authorization": "key=" + store.state.user.currentUser} })
            .then((respG) => {
                return {
                    header: [{text: "Name", value: "name"},{text: "Price", value: "price"},{text: "action", value: "_id"}],
                    list: respG.data, 
                    company_id: resp.data._id
                }
            }).catch((err) => {

            });
        }).catch((err) => {
            error("Something went wrong")
        });
    },
    mixins: [func]
}
</script>
<style scoped>

</style>
