<template>
  <v-layout justify-center>
    <v-flex xs12 sm6>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline">Login</h3>
        </v-card-title>
        <v-card-text>
          <form-component />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import { FormComponent } from "./components";

export default Vue.extend({
  name: "LoginPage",
  components: { FormComponent },
});
</script>
