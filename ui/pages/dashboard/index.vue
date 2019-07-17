<template>
    <v-container pt-0>
        <v-layout>
            <v-flex xs12>
                <v-btn block color="primary" flat title="Add New" :nuxt="true" :to="'/dashboard/product/new'" :right="true"><v-icon>add</v-icon> Create Product</v-btn>
            </v-flex>
        </v-layout>
        <counter :user="user" />
        <ReportCounter :user="user" />
    </v-container>
</template>

<script>
import counter from '@/components/dashboard/counter';
import ReportCounter from '@/components/dashboard/reportCounter';
export default {
    components: {
        counter,
        ReportCounter
    },
    meta: {
        requireAuth: true
    },

    asyncData({store, error}){
        // return axios.get("http://localhost/api/dashboard/order-tracking", {headers:{"Authorization": "key="+store.state.user.currentUser}})
        // .then((res) => {
        //     console.log(res.data);
        //     return {
        //         list: res.data 
        //     }    
        // }).catch(err => error("Something went wrong"));
        return {
            user: store.state.user.currentUser
        }
    }
    
}
</script>

<style>
@font-face {
    font-family: 'Technology Bold';
    src: url('~static/fonts/Technology-Bold.ttf');
}
.digits{
    font-family: 'Technology Bold' !important;
}

</style>
