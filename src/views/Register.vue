<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="password_confirmation"
        type="password_confirmation"
        placeholder="password_confirmation"
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { api } from "../services/api";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    async register() {
      try {
        await api.register({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        alert("Registration successful");
        this.$router.push("/login");
      } catch (error) {
        alert("Registration failed");
      }
    },
  },
};
</script>
