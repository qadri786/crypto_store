<template>
    <v-item-group>
    <v-container grid-list-md>
      <v-layout wrap>
          <v-flex v-for="(item, key) in items" :key="key" xs12 md4>
              <v-card>
                  <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" ></v-img>
                  <v-card-title primary-title>
                      {{item.name}}
                  </v-card-title>
              </v-card>
          </v-flex>
      </v-layout>
    </v-container>
    </v-item-group>
</template>

<script>
export default {
    props: {
        items: {type: Array, required: true}
    }
}
</script>

<style>

</style>
