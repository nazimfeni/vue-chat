<template>
  <div>
    <!-- Show the router-view or login based on isLoggedIn -->
    <router-view v-if="isLoggedIn" />
    <Login v-else />
  </div>
</template>

<script setup>
import Login from "./views/Login.vue";
import { ref } from "vue";

// Define the logged-in state
const isLoggedIn = ref(false); // Replace with your actual login logic

isLoggedIn.value = !!localStorage.getItem("authToken");
</script>
