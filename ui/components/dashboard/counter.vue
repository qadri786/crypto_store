<template>
    <v-layout warp grid-list-md>
        <v-flex md12>
            <v-item-group>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 md4>
                        <v-item>
                            <v-card :elevation="2" color="blue" height="180">
                                <v-card-title primary-title>
                                    <h3 class="headline mb-0 white--text">Pending</h3>
                                </v-card-title>
                                <v-card-text>
                                    <p class="digits display-3 white--text text-xs-center">0</p>
                                </v-card-text>
                            </v-card>
                        </v-item>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-item>
                            <v-card :elevation="2" color="green" height="180">
                                <v-card-title primary-title>
                                    <h3 class="headline mb-0 white--text">Completed</h3>
                                </v-card-title>
                                <v-card-text>
                                    <p class="digits display-3 white--text text-xs-center">0</p>
                                </v-card-text>
                            </v-card>
                        </v-item>
                    </v-flex>
                    <v-flex xs12 md4>
                        <v-item>
                            <v-card :elevation="2" color="red" height="180">
                                <v-card-title primary-title>
                                    <h3 class="headline mb-0 white--text">Cancelled</h3>
                                </v-card-title>
                                <v-card-text>
                                    <p class="digits display-3 white--text text-xs-center">0</p>
                                </v-card-text>
                            </v-card>
                        </v-item>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-item-group>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: {
        user: {type: String}
    }
}
</script>

<style>

</style>
