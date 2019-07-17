<template>
    <v-alert v-if="text" :value="true" :type="type">{{text}}</v-alert>
</template>

<script>
export default {
    props: {
        type: {type: String, required: true},
        text: {type: String, required: true}
    }
}
</script>

<style>

</style>
