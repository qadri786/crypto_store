<template>
  <v-layout column>
    <v-flex>
      <ContentView />
    </v-flex>
  </v-layout>
</template>

<script>

import ContentView from '@/components/home/ContentView'

// This file is frontend route which is known as Home or Index
export default {
  components: {ContentView},
}
</script>
<style scoped>

</style>
