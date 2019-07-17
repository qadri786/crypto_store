<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <v-expansion-panel :popout="true">
                    <v-expansion-panel-content>
                        <template v-slot:header>
                            <div>{{title}}</div>
                        </template>
                        <v-flex xs12 v-for="(item, key) in keyval" :key="key">
                            <v-select v-if="!item.multi" :items="item.value.split(',')" :label="item.key" :suffix="'Rs. ' + item.price.toString()"></v-select>
                            <v-select v-if="item.multi" :items="item.value.split(',')" attach chips :label="item.key" multiple :suffix="'Rs. ' + item.price.toString()"></v-select>
                        </v-flex>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    props: {
        title: {type: String, required: true},
        keyval: {type: Array, required: true}
    }
}
</script>
<style scoped>
.box{
    border-bottom: 1px solid #cccccc;
}
</style>

