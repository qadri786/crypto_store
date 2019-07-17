<template>
    <v-container>
      <v-layout row>
        <v-flex>
          <alert :type="alertType" :text="alertText"></alert>
          <v-card flat>
            <v-card-title primary-title><h3 class="headline mb-0">Login</h3></v-card-title>
            <v-text-field prepend-icon="person" name="email" v-model="email" type="text" label="Email Address" />
            <v-text-field prepend-icon="lock" name="password" v-model="password" type="password" label="Password" />
            <v-card-actions>
              <v-btn color="success" large block @click="login">Login</v-btn>
              <v-btn color="error" :nuxt="true" to="register" large block>Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-btn color="primary" flat large block :nuxt="true" :to="'/user/forget'">Forget password?</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import func from '@/mixin/func';
import Alert from '@/components/Alert'
export default {
    components: {
      Alert
    },
    data: () => {
      return {
        email: "",
        password: "",
        alertType: "info", alertText: ""
      }
    },

    methods: {  

      login: function(){
        this.signIn({
            provider: "email", 
            email: this.email, 
            password: this.password, 
            callback: () => {
              this.$router.push("/dashboard"); 
            },
            callbackErr: (err) => {
              this.alertType = "error"
              this.alertText = "Email address or password invalid";
            }
         });
      }
    },

    mixins: [func]
}
</script>
<style scoped>

</style>
