<template>
    <v-layout wrap>
        <v-flex md6 xs12 px-1 pb-2>
            <v-card class="mx-auto text-xs-center">
                <v-card-text>
                    <v-sheet color="#e9d9a8">
                        <p class="digits display-3 text-xs-right px-3">{{Order}}</p>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Orders Last 24h</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block flat color="primary">Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex md6 xs12 px-1 pb-2>
            <v-card class="mx-auto text-xs-center">
                <v-card-text>
                    <v-sheet color="#e9d9a8">
                        <p class="digits display-3 text-xs-right px-3">Rs. {{Earn}}</p>
                    </v-sheet>
                </v-card-text>
                <v-card-text>
                    <div class="display-1 font-weight-thin">Earn Last 24h</div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block flat color="primary">Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex md6 xs12 px-1 pb-2>
            <v-card class="mx-auto text-xs-center">
                <v-list subheader style="max-height: 200px" class="scroll-y">
                    <v-subheader inset>Order listing</v-subheader>
                    <v-list-tile v-for="(item, key) in items" :key="key">
                        <v-list-tile-content>{{item.product.name}}</v-list-tile-content>
                        <v-list-tile-action>
                            <v-badge color="primary" left>
                                <template v-slot:badge>
                                    <span>{{item.qty}}</span>
                                </template>
                            </v-badge>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block flat color="primary">Go to Report</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex md6 xs12 px-1 pb-2>
            <v-card class="mx-auto text-xs-center">
                <v-data-table class="xs12 scroll-y" v-bind:items="list" style="max-height: 200px">
                    <template v-slot:items="props">
                        <td>
                            <v-layout column>
                                <v-flex>
                                    {{props.item.name}}
                                </v-flex>
                                <v-flex>
                                    <share-view :id="props.item._id" :title="props.item.name" :description="props.item.description" />
                                </v-flex>
                            </v-layout>
                        </td>                    
                        <td>{{props.item.price}}</td>
                        <td>
                            <v-btn flat icon :nuxt="true" :to="'/dashboard/product/' + props.item._id">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon @click="btnDelete(props.item._id)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                </v-data-table>
                <v-divider></v-divider>
                <v-card-actions class="justify-center">
                    <v-btn block flat color="primary" :nuxt="true" :to="'/dashboard/product'">Go to Section</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
import shareView from '@/components/product/share.vue'

export default {
    components:{
        shareView: shareView,
    },
    props: {
        user: {type: String}
    },
    mounted(){
        if(this.user){
            axios.get("/api/dashboard/order-tracking", {headers:{"Authorization": "key="+this.user}})
            .then((resp) => {
                this.items = resp.data;
                this.Order  = resp.data.map((item) => { return item.qty }).reduce((total, next) => { return total + next  });
                this.Earn  = resp.data.map((item) => { return item.price }).reduce((total, next) => { return total + next  });
            })
            .catch(err => console.log(err.response.data));
            axios.get("/api/productGrid", { headers: {"Authorization": "key=" + this.user} })
            .then((resp) => {
                this.list = resp.data;
            })
            .catch(err => console.log(err.response.data))
        }
    },
    data(){
        return {
            list: [],
            items: [],
            Order: 0,
            Earn: 0
        }
    }
}
</script>

<style>

</style>
