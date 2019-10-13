<template>
    <v-layout column>
        <v-flex>
            <v-text-field type="text" label="Name" :value="name" />
        </v-flex>
        <v-flex>
            <v-text-field type="email" label="Email Address" :value="email" />
        </v-flex>
        <v-flex>
            <v-text-field type="text" label="Phone" :value="phone" />
        </v-flex>
        <v-flex>
            <v-text-field type="text" label="Address" />
        </v-flex>
        <v-flex>
            <v-btn color="primary" large @click="save"><v-icon>save</v-icon> Save</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    methods: {
        save(){
            axios.post("/api/customer/register",
            {name: this.name, email: this.email, phone: this.phone },
            {"Content-Type": "application/json", headers: { "Authorization": "key=" + this.user}})
            .then((resp) => {
                alert("Save");
            })
            .catch(err => alert(err));
        }
    },
    asyncData({store, error}){
        return axios.get("http://" + (process.server ? "api:3000" : "localhost") + "/api/customer", {headers:{"Authorization": "key="+store.state.user.currentUser}})
        .then((resp) => {
            return {
                name: resp.data.name,
                email: resp.data.email,
                phone: resp.data.phone,
                user: store.state.user.currentUser
            }
        }).catch(err => error("something went wrong"));
    }
}
</script>

<style>

</style>
