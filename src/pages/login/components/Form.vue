<template>
  <v-form>
    <v-layout column justify-center>
      <v-text-field label="Name" />
      <v-text-field label="Password" type="password" />
      <v-btn type="submit" color="info">Login</v-btn>
    </v-layout>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FormComponent",
});
</script>
<style scoped>
  
</style>