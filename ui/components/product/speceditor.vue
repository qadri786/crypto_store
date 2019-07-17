<template>
<v-container>
    <h3>Options</h3>
    <v-layout row wrap>
    <v-text-field v-model="key" class="xs3 pr-2" placeholder="Name" />
    <v-text-field v-model="value" class="xs3 pr-2" placeholder="Value" />    
    <v-text-field v-model="price" class="xs3 pr-2" placeholder="Price" />
    <v-checkbox v-model="isMulti" class="xs3 pr-2" label="Multiple"/>
    <v-btn color="primary" @click="btnClick">Add</v-btn>
    </v-layout>
    <v-data-table class="xs12" v-bind:headers="header" v-bind:items="items">
        <template v-slot:items="props">
            <th>{{props.item.key}}</th>
            <td>{{props.item.value}}</td>
            <td>{{props.item.price}}</td>
            <td><v-checkbox v-model="props.item.multi" /></td>
            <td>
                <v-btn title="edit" icon @click="itemEdit(props.item)">
                    <v-icon>edit</v-icon>
                </v-btn>
                <v-btn title="delete" icon @click="itemDelete(props.item)">
                    <v-icon>delete</v-icon>
                </v-btn>
            </td>
        </template>
    </v-data-table>
</v-container>
</template>
<script>
export default {
    props: {
        items: {required: true},
        itemDelete: {type: Function, required: true}
    },
    methods:{
        itemEdit(data){
            this.key = data.key
            this.value = data.value
            this.price = data.price
            this.isMulti = data.multi
        },

        

        btnClick: function(e){   
            if (this.key !== "" && this.value !== ""){
                let mItem = this.items.filter((item) => {
                    return item.key == this.key && item.value == this.value
                });
                if(mItem.length > 0){
                    mItem[0].key = this.key;
                    mItem[0].value = this.value;
                    mItem[0].price = this.price;
                    mItem[0].multi = this.isMulti;
                }else{
                    this.items.push({key: this.key, value: this.value, price: this.price, multi: this.isMulti});
                }
                this.key = ""; this.value= ""; this.price = 0; this.isMulti = false;
            }
        }
    },
    data: () => {
        return {
            key: "", value: "", price: "", isMulti: false,
            header: [
                {text: "Name", value: "key"},
                {text: "Value", value: "value"},
                {text: "Price", value: "price"},
                {text: "Multiple", value: "multi"}
            ]
        }
    }
}
</script>
