<template>
    <v-container>
        <v-card>
            <v-card-title primary-title>{{title}}</v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <slot name="action"></slot>
            </v-card-actions>
            <slot name="list"></slot>
        </v-card>
    </v-container>
</template>
<script>
export default {
    meta: {
        requireAuth: true
    },

    props:{
        title: { required: true, type: String }
    }
}
</script>
