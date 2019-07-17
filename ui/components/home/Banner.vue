<template>
    <v-card color="black" dark>
        <v-window v-model="onboarding">
            <v-window-item v-for="n in length" :key="`card-${n}`">
            <v-card color="transparent" flat height="340px">
                <v-layout align-center justify-center fill-height tag="v-card-text">
                <v-img :src="'//placehold.it/340?text=' + parseInt(n)" height="100%" />        
                </v-layout>
            </v-card>
            </v-window-item>
        </v-window>
        <v-card-actions class="justify-space-between">
            <v-btn flat @click="prev">
            <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-item-group v-model="onboarding" class="text-xs-center" mandatory>
            <v-item v-for="n in length" :key="`btn-${n}`">
                <v-btn slot-scope="{ active, toggle }" :input-value="active" icon @click="toggle">
                <v-icon>stop</v-icon>
                </v-btn>
            </v-item>
            </v-item-group>
            <v-btn flat @click="next">
            <v-icon>chevron_right</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {

    data(){
        return {
            length: 3,
            onboarding: 0
        }
    },

    methods:{
        next () {
            this.onboarding = this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
        },
        prev () {
            this.onboarding = this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
        }
    }
}
</script>

<style>

</style>
