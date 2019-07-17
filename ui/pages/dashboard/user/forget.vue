<template>
    <v-container>
      <v-layout row>
            <v-flex>
            <alert :type="alertType" :text="alertText"></alert>
            <v-card flat>
            <v-card-title primary-title>Forget Password</v-card-title>
            <v-text-field prepend-icon="person" name="email" v-model="email" type="text" label="Email Address" />
            <v-card-actions>
                <v-btn color="success" large block @click="submit">Submit</v-btn>
            </v-card-actions>
            </v-card>
        </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import func from '@/mixin/func';
import alert from '@/components/Alert';
export default {
    components: {
      Alert
    },
    data: () => {
      return {
        email: "",
        alertType: "info",
        alertText: ""
      }
    },

    methods: {  

      submit: function(){
        this.forgetPassword({ 
            email: this.email, 
            callback: (resp) => {
                this.alertType = "info"
                this.alertText = "Email address has been sent";
            },
            callbackErr: (err) => {
                this.alertType = "error"
                this.alertText = "Email address invalid";
            }
          });
      }
    },

    mixins: [func]
}
</script>
<style scoped>

</style>
