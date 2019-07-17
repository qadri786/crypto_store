<template>
  <v-layout column>
    <v-flex>
      <BannerView />
    </v-flex>
    <v-flex>
      <ContentView />
    </v-flex>
    <v-flex>
      <NewsletterView />
    </v-flex>
  </v-layout>
</template>

<script>
import BannerView from '@/components/home/Banner'
import ContentView from '@/components/home/ContentView'
import NewsletterView from '@/components/home/Newsletter'
// This file is frontend route which is known as Home or Index
export default {
  components: {ContentView, BannerView, NewsletterView},
}
</script>
<style scoped>

</style>
