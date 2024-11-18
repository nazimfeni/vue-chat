<template>
    <div>
        <h1>Welcome to the Dashboard</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script>
import { api } from '../services/api';

export default {
    methods: {
        async logout() {
            try {
                await api.logout();
                alert('Logged out successfully');
                this.$router.push('/login');
            } catch (error) {
                alert('Logout failed');
            }
        },
    },
};
</script>
