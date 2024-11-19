<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { api } from '../services/api';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        async login() {
    try {
        const response = await api.login({ email: this.email, password: this.password });

        // Extract token and user data from the API response
        const { token, user } = response.data;

        // Save the token (e.g., in localStorage or Vuex store)
        localStorage.setItem('authToken', token);

        alert(`Welcome, ${user.name}! Login successful.`);

        // Redirect to the dashboard
        this.$router.push('/dashboard');
    } catch (error) {
        alert('Invalid credentials');
        console.error('Login error:', error); // Debugging
    }
}
    },
};
</script>
