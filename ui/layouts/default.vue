<template>
  <v-app>
    <v-navigation-drawer v-if="me != ''  && isAdmin" v-model="drawer" :mini-variant="false" :clipped="true" temporary fixed app>
        <v-list>
            <v-list-tile :to="'/dashboard'" router exact>
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title v-text="'Dashboard'" />
                </v-list-tile-content>
            </v-list-tile>
            <v-list-group>
            <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-action>
                  <v-icon>dashboard</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                  <v-list-tile-title v-text="'Product'" />
                  </v-list-tile-content>
                </v-list-tile>
            </template>
            <v-list-tile :to="'/dashboard/product'" router exact>
                <v-list-tile-content>
                    <v-list-tile-title v-text="'View'" />
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="'/dashboard/product/new'" router exact>
                <v-list-tile-content>
                    <v-list-tile-title v-text="'Add New'" />
                </v-list-tile-content>
            </v-list-tile>
            </v-list-group>
            <v-list-group class="d-none">
            <template v-slot:activator>
                <v-list-tile>
                <v-list-tile-title>Reports</v-list-tile-title>
                </v-list-tile>
            </template>
            <v-list-tile :to="'/dashboard/orders'" router exact>
                <v-list-tile-content>
                    <v-list-tile-title v-text="'Orders'" />
                </v-list-tile-content>
            </v-list-tile>
            </v-list-group>
            <v-list-tile :to="'/dashboard/company'" router exact>
                <v-list-tile-action>
                <v-icon>dashboard</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                <v-list-tile-title v-text="'Company settings'" />
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed dark app color="primary">
      <v-toolbar-side-icon v-if="me != ''  && isAdmin" @click="drawer = !drawer" />
      <v-toolbar-side-icon><img src="~/assets/imgs/32.png"/></v-toolbar-side-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon :nuxt="true" to="/"><v-icon>home</v-icon></v-btn>
      <v-btn v-if="!isAdmin" icon @click.stop="rightDrawer = !rightDrawer"><v-icon>shopping_basket</v-icon></v-btn>
      <v-btn v-if="me == ''" icon :nuxt="true" :to="'/user/login'"><v-icon>person</v-icon></v-btn>
      <v-menu offset-y v-if="me">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">User</v-btn>    
        </template>
        <v-list>
          <v-list-tile v-if="!isAdmin" :nuxt="true" :to="'/user/profile'">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="signOut">
            <v-list-tile-title>Signout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer :right="true" v-model="rightDrawer" temporary fixed>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>Qty: {{ myTotal.qty }} | Total: {{ myTotal.total }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon color="primary" :disabled="$store.state.basket.list.length > 0 ? false : true" :nuxt="true" :to="'/checkout'">
              <v-icon>shopping_cart</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
      <basket-item v-bind:items="$store.state.basket.list"  />
    </v-navigation-drawer>
    <v-footer app>
      
    </v-footer>
  </v-app>
</template>

<script>
import basketItem from "@/components/product/basketItem.vue";
import func from "@/mixin/func.js";
import { mapGetters } from 'vuex'
import axios from 'axios'
// import storage from "localStorage";
export default {
    components: {
      basketItem
    },

    computed:{
      ...mapGetters({myTotal: 'basket/totalBasket', me: 'user/getUser', isAdmin: 'user/getIsAdmin'})
    },

    beforeMount(){
      // storage.getItem("cs_user");
      
      this.$store.commit("basket/basketInit");
    },

    data() {
      return {
        items: [
          {icon: 'dashboard', title: 'Home', to: '/dashboard'},
          {icon: 'dashboard', title: 'Catelog/Company', to: '/dashboard/company'},
          {icon: 'dashboard', title: 'Catelog/Products', to: '/dashboard/product'},
        ],
        drawer: false,
        rightDrawer: false,
        title: 'The Smart Store',       
        // isAdmin: this.$store.state.user.isAdmin
      }
    },
    mixins: [func]
  }
</script>
