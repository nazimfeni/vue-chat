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
                await api.login({ email: this.email, password: this.password });
                alert('Login successful');
                this.$router.push('/dashboard');
            } catch (error) {
                alert('Invalid credentials');
            }
        },
    },
};
</script>
