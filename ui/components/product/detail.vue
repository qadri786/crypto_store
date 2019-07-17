<template>
<v-container fluid grid-list-md>
    <v-layout row wrap>
        <v-flex d-flex xs12 sm3 md3>
            <!-- <v-carousel :hide-delimiters="true" height="320px" :light="false" :vertical="true" prev-icon="mdi-arrow-left"
    next-icon="mdi-arrow-right">
                <v-carousel-item v-for="(image,i) in item.image" :key="i" contain :src="image.path"></v-carousel-item>
            </v-carousel> -->
            <swiper :images="item.image"></swiper>
        </v-flex>
        <v-flex d-flex xs12 sm9 md9>
            <v-card flat>
                <h3 class="headline mb-0">{{ item.name }}</h3>
                <v-card-title primary-title>
                    <div>
                        <span>Rs. <span v-text="item.price"></span></span><br />
                        <span>Company: <span v-text="item.company.name"></span></span>
                        <share-view :id="item._id" :title="item.name" :description="item.description" class="pt-2"/>        
                    </div>
                </v-card-title>
                <spec-view v-if="item.specification.length > 0" title="Options" :keyval="item.specification"/>                    
                <v-layout row>
                    <v-flex>
                        <addtobasketbtn v-if="!admin" v-bind:user="user" path="link" v-bind:items="[item]" />
                    </v-flex>
                    <v-flex>
                        <addtocartbtn v-if="!admin" path="link" v-bind:id="item._id" v-bind:name="item.name" v-bind:company="item.company._id" v-bind:price="item.price" v-bind:qty="1" />
                    </v-flex>
                </v-layout>
                <v-card-text v-html="item.short_description" />
                <v-divider></v-divider>
                <v-card-text v-html="item.description" />
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
import specView from '@/components/product/spec.vue'
import shareView from '@/components/product/share.vue'
import addtobasketbtn from '@/components/product/singleOrder/addtocartbtn.vue'
import addtocartbtn from '@/components/product/addtocartbtn.vue'
import swiper from '@/components/product/swiper.vue'
export default {
    components:{specView, shareView, addtobasketbtn, swiper, addtocartbtn},
    props: {
        item: {type: Object, required: true},
        user: {type: String},
        admin: {type: Boolean}
    },
    data(){
        return {
            swiperOptions: {
                loop: true, height: 200, slidesPerView: 1, centeredSlides: false, spaceBetween: 0,
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: false
                },
            }
        }
    }
}
</script>
<style>

</style>
