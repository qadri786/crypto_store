<template>
    <form-layout title="Product">
        <v-form slot="content" class="pl-2 pr-2">
            <v-btn color="primary" flat title="go back" :nuxt="true" :to="'/dashboard/product'" value="right"><v-icon>arrow_back</v-icon> Go back</v-btn>
            <v-layout row wrap>
                <v-checkbox v-model="status" label="Enable"></v-checkbox>
            </v-layout>
            <v-layout row wrap>
                <v-select v-model="category_id" :items="categories" item-text="name" item-value="_id" label="Category"></v-select>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs-6 pr-2>
                    <v-text-field v-model="name" type="text" label="Name" />
                </v-flex>
                <v-flex xs-6>
                    <v-text-field mask="#######" v-model="price" label="Price" />
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex>
                    <v-textarea maxlength="150" v-model="short_description" label="Short Description"></v-textarea>
                </v-flex>    
            </v-layout>
            <v-layout row wrap>
                <v-flex>
                    <input type="file" multiple=true ref="images" accept="image/*" @change="handleFileSelector" >
                </v-flex>   
            </v-layout>
            <v-divider class="pt-2 mt-2"></v-divider>
            <v-expansion-panel>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div>(Optional)</div>
                    </template>
                    <v-layout row px-3>
                        <v-flex>
                            <TuiEditor label="Description" v-model="description" mode="wysiwyg" preview-style="vertical" height="420px" />
                        </v-flex>   
                    </v-layout>
                    <v-layout row wrap px-3>
                        <v-flex xs-6 pr-2>
                            <v-text-field mask="#######" v-model="stock" label="Stock" />
                        </v-flex>
                        <v-flex xs-6>
                            <v-text-field v-model="sku" type="text" label="SKU" />
                        </v-flex>
                    </v-layout>
                    <v-layout column px-3>
                        <v-flex xs-12>
                                <v-select v-model="visibility" :items="['catelog', 'search']" attach chips label="Visibility" multiple></v-select>
                        </v-flex>
                        <v-flex xs-12>
                                <spec-editor v-bind:items="specs" :itemDelete="itemDelete"></spec-editor>
                        </v-flex>
                    </v-layout>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <template v-slot:header>
                        <div>SEO things</div>
                    </template>
                    <v-layout column px-3>
                        <v-flex xs12>
                            <v-text-field type="text" label="Keywords" value="" placeholder="product, color, price" />
                        </v-flex>
                        <v-flex xs12>
                            <v-select :items="[]" label="Select Image"></v-select>
                        </v-flex>
                    </v-layout>
                </v-expansion-panel-content>
            </v-expansion-panel>                
        </v-form>
        <div slot="action">
            <v-btn color="primary" large @click.prevent="btnSave"><v-icon>save</v-icon> Save</v-btn>
        </div>
    </form-layout>
</template>
<script>
import shareView from '@/components/product/share.vue'
import speceditor from "@/components/product/speceditor"
import backform from "@/helper/backform"
import func from "@/mixin/func"
import axios from 'axios'
export default {
    components: {
        formLayout: backform,
        specEditor: speceditor,
        shareView: shareView,
    },
    meta: {
        requireAuth: true
    },
    

    methods:{
    
        itemDelete(data){
            this.specs = this.specs.filter((item) => {
                return item.key != data.key && item.value != data.value;
            });
        },

        handleFileSelector: function(){
            this.images = this.$refs.images.files
        },      

        btnSave: function() {
            let specs = [];
            this.specs.map(item => specs.push({key: item.key, value: item.value, price: item.price, multi: item.multi}));
            axios.put("/api/product/" + this.id,
            {
                name: this.name, 
                category_id: this.category_id,
                price: this.price,
                stock: this.stock,
                sku: this.sku,
                visibility: this.visibility,
                specification: this.specs,
                short_description: this.short_description,
                description: this.description,
                company_id: this.company_id,
                status: this.status
            }, 
            {"Content-Type": "application/json", headers:{"Authorization": "key=" + this.$store.state.user.currentUser}}).then((resp) => {
                if(this.images !== ""){
                    let FD = new FormData();
                    for(var i = 0; i < 5; i++ ){
                        let file = this.images[i];
                        FD.append('image', file);
                    }
                    this.postData("/api/product/upload/" + resp.data._id, FD, {"Content-Type": "multipart/form-data", headers:{"Authorization": "key=" + this.$store.state.user.currentUser}}, (resp) => {
                        alert("Updated"); 
                        this.$router.push("/dashboard/product");
                    }, (err) => {
                        alert("Error while uploading"); 
                    }) 
                }else{
                    alert("Updated");
                    this.$router.push("/dashboard/product");
                }
            }, (err) => {
                alert("Error while updating"); 
            })
        }
    },
    created() {
        axios.get("/api/category").then((resp) => {
            this.categories = resp.data;
        }).catch(err => console.log(err));
    },
    asyncData({store, error, redirect, params}){
        return axios.get("http://localhost/api/user/company", { headers: {"Authorization": "key=" + store.state.user.currentUser} })
        .then((resp) => {
            return axios.get("http://localhost/api/product/" + params.id, { headers: {"Authorization": "key=" + store.state.user.currentUser} }).then((respG) => {
                let s = []
                respG.data.specification.map(item => s.push({key: item.key, value: item.value, price: item.price, multi: item.multi}))
                return {
                    id: respG.data._id, 
                    name: respG.data.name, 
                    category_id: respG.data.category,
                    sku: respG.data.sku,
                    price: respG.data.price, 
                    stock: respG.data.stock, 
                    status: respG.data.activeyn,
                    visibility: respG.data.visibility,
                    short_description: respG.data.short_description,
                    description: respG.data.description, 
                    specs: s, 
                    images: "", 
                    company_id: resp.data._id,
                    categories: []
                }
            });
        }).catch((err) => {
            error("Something went wrong")
        });
    },
    mixins: [func]
}
</script>
<style scoped>

</style>
