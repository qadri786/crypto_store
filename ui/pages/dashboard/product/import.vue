<template>
    <form-layout title="Product Import">
        <div slot="content" class="px-2">
            <v-layout row wrap>
                <v-flex>
                    <input type="file" multiple=true ref="file" @change="handleFileChange" >
                </v-flex>   
            </v-layout>
        </div>
        <div slot="list">
            {{ list }}
        </div>
    </form-layout>
</template>

<script>
import backform from "@/helper/backform"
import axios from "axios"
export default {
    
    components: {
        backform:FormLayout
    },
    meta: {
        requireAuth: true
    },
    methods: {
        handleFileChange(){
            this.csvFile = this.$refs.file.files[0];
            let FD = new FormData()
            FD.append("csv", this.csvFile);
            axios.post("/api/product/import", FD,{"Content-Type": "multipart/form-data", headers:{"Authorization": "key=" + this.user}})
            .then((resp) => {
                this.list = resp.data;
            })
            .catch((err) => {
                console.log(err.response.data);
            })
        }
    },
    asyncData({store}){
        return{
            csvFile: "",
            list: [],
            user: store.state.user.currentUser
        }
    }
}
</script>

<style>

</style>
