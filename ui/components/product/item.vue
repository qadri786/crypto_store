<template>
  <v-flex md3 pr-2 pb-2>
    <v-card height="100%">
      <v-img v-if="item.image.length <= 0" class="white--text" contain height="200px" v-bind:src="'https://placehold.it/200'" />
      <v-img v-if="item.image.length > 0" class="white--text" contain height="200px" v-bind:src="item.image[0].path" />
      <v-card-title primary-title>
          <div>
            <nuxt-link v-bind:to="'/product/' + item._id"><h3 class="headline mb-0">{{ item.name }}</h3></nuxt-link>
            <h4>{{ item.company.name }}</h4>
            <div>Rs. {{ item.price }}</div>
            <share-view :id="item._id" :title="item.name" :description="item.description" />
          </div>
      </v-card-title>
      <v-card-actions>
        <!-- <addtocartbtn v-bind:id="item._id" v-bind:name="item.name" v-bind:price="item.price" v-bind:company="item.company._id" v-bind:qty="1" path="link" /> -->
      </v-card-actions>
    </v-card>
  </v-flex>
</template>
<script>
import shareView from '~/components/product/share.vue'
import addtocartbtn from '@/components/product/addtocartbtn.vue'
export default {
    components:{
      shareView,
      addtocartbtn
    },
    props: {item: {type: Object, required: true}},
}
</script>

<style scoped>

</style>
