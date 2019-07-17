<template>
    <v-layout column>
        <v-flex>
            <div v-swiper:mySwiper="swiperOptionTop" ref="swiperTop">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(image,i) in images" :key="i">
                        <v-img :src="image.path" />
                    </div>
                </div>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </div>
            <div v-swiper:mySwiperThumbs="swiperOptionThumbs" ref="swiperThumbs">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(image,i) in images" :key="i">
                        <v-img height="64px" width="64px" :src="image.path" />
                    </div>
                </div>
            </div>
        </v-flex>
    </v-layout>
    

</template>

<script>
export default {
    props: {
        images: {type: Array, required: true}
    },
    mounted(){
        this.swiperOptionTop = {
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };
        this.swiperOptionThumbs = {
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true
        };
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper
            const swiperThumbs = this.$refs.swiperThumbs.swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
        })
    },
    data() {
        return {
            swiperOptionTop: {},
            swiperOptionThumbs: {}
        }
    }
}
</script>

<style>

</style>
