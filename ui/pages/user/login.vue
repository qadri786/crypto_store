<template>
    <v-container>
      <v-layout row>
        <v-flex>
          <alert :type="alertType" :text="alertText"></alert>
          <!-- <v-card flat>
            <v-card-title primary-title>Login</v-card-title>
            <v-text-field prepend-icon="person" name="email" v-model="email" type="text" label="Email Address" />
            <v-text-field prepend-icon="lock" name="password" v-model="password" type="password" label="Password" />
            <v-card-actions>
              <v-btn color="success" large block @click="login">Login</v-btn>
              <v-btn color="blue" large block @click="fb_login">Facebook</v-btn>
            </v-card-actions>
          </v-card> -->
          <v-btn color="blue" large block @click="fb_login">Facebook</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex d-none>
          <v-btn color="primary" flat large block :nuxt="true" :to="'/user/forget'">Forget password?</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-btn color="primary" large block :nuxt="true" :to="'/dashboard/user/register'">Become a seller</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
import func from '@/mixin/func';
import alert from '@/components/Alert'
export default {
    components: {
      alert
    },
    data: () => {
      return {
        email: "",
        password: "",
        alertText: "",
        alertType: ""
      }
    },

    methods: {  
      fb_login: function(){
        this.signIn({
          provider: "facebook", 
          callback: (resp) => {
            setTimeout(() => {
              window.location = "/user/profile";
            }, 1000)
            
          },
          callbackErr: (err) => {
              this.alertType = "error"
              this.alertText = "invalid login argument";
            }
        });
      },

      login: function(){
        this.signIn({
            provider: "email", 
            email: this.email, 
            password: this.password,
            callback: () => {
              setTimeout(() => {
                window.location = "/user/profile";
              }, 1000)
              
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
