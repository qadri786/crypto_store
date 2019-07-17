<template>
    <div>
        <detail-view v-bind:user="user" v-bind:admin="isAdmin" v-bind:item="item" />
    </div>
</template>

<script>
import detailView from '~/components/product/detail.vue'
import axios from 'axios';
export default {
    
    components: {
        detailView
    },

    head(){
        return {
            meta: [
                { hid: 'og:url', property: 'og:url', content: process.env.BASE_URL + "/product/" + this.item._id },
                { hid: 'og:type', property: 'og:type', content: "product" },
                { hid: 'og:title', property: 'og:title', content: this.item.name },
                { hid: 'og:description', property: 'og:description', content: this.item.short_description },
                { hid: 'og:image', property: 'og:image', content: this.item.image[0].path },
                { hid: 'og:availability', property: 'og:availability', content: this.item.stock > 0 ? "instock" : "outofstock" },
                { hid: 'product:price:amount', property: 'product:price:amount', content: this.item.price },
                { hid: 'product:price:currency', property: 'product:price:currency', content: "PKR" },
                { hid: 'twitter:card', property: 'twitter:card', content: 'summary' },
                { hid: 'twitter:site', property: 'twitter:site', content: '@thesmartstorepk' },
                { hid: 'twitter:description', property: 'twitter:description', content: this.item.short_description },
                { hid: 'twitter:creator', property: 'twitter:creator', content: this.item.company.name },
                { hid: 'twitter:image', property: 'twitter:image', content: this.item.image[0].path },
            ]
        }
    },

    asyncData({store,params, error}){
        return axios.get("http://localhost/api/product/" + params.id).then((resp) => {
            return {
                item: resp.data,
                user: store.state.user.currentUser,
                isAdmin: store.state.user.isAdmin
                };
        }).catch((err) => {
            console.error(err);
            error({statusCode: 404, message: "Product not found"})
        });  

    }
}
</script>

<style>

</style>
