<template>
  <div>
    <!-- Show the router-view if the user is logged in -->
    <router-view v-if="isLoggedIn" />
    <div v-else>
      <div class="auth-container">
        <div class="auth-buttons">
          <button :class="{ active: showLogin }" @click="showLogin = true">
            Login
          </button>
          <button :class="{ active: !showLogin }" @click="showLogin = false">
            Register
          </button>
        </div>
        <div class="auth-forms">
          <Login v-if="showLogin" />
          <Register v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import { ref } from "vue";

// Define the logged-in state
const isLoggedIn = ref(false); // Replace with your actual login logic

// Simulate login state using localStorage
isLoggedIn.value = !!localStorage.getItem("authToken");

// State to toggle between Login and Register
const showLogin = ref(true);
</script>

<style scoped>
.auth-container {
  text-align: center;
  margin: 20px auto;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
}

.auth-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: 1px solid #007bff;
  background-color: #fff;
  color: #007bff;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

button.active {
  background-color: #007bff;
  color: #fff;
}

button:hover {
  background-color: #0056b3;
  color: #fff;
}

.auth-forms {
  margin-top: 10px;
}
</style>
