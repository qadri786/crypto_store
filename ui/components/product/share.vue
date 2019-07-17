<template>
    <div class="sharing">
    <social-sharing quote="thesmartstore.pk" hashtags="thesmartstore.pk,tss" :url="baseUrl() + '/product/' + id" inline-template>
        <div>
        <network network="facebook">
            <v-icon class="pr-2">fa-facebook-square fa-2x</v-icon>
        </network>
        <network network="twitter">
            <v-icon class="pr-2">fa-twitter-square fa-2x</v-icon>
        </network>
        <network network="pinterest">
            <v-icon class="pr-2">fa fa-pinterest fa-2x</v-icon>
        </network>
        <network network="whatsapp">
            <v-icon class="pr-2">fa-whatsapp fa-2x</v-icon>
        </network>
        </div>
    </social-sharing>
    </div>
</template>
<script>
export default {
    props: {
        id: { type:String, required: true },
        title: { type:String, required: true },
        description: { type:String, required: true },
    },
    methods: {
        baseUrl: function(){
            return process.env.BASE_URL
        }
    }
}
</script>
