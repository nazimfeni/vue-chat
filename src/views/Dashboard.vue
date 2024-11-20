<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <button @click="logout">Logout</button>
    <Chat />
    <!-- Use the Chat component -->
  </div>
</template>

<script>
import Chat from "../views/Chat.vue"; // Adjust the path based on your project structure

export default {
  components: {
    Chat, // Register the Chat component
  },
  methods: {
    logout() {
      try {
        // Clear authentication data from local storage
        localStorage.removeItem("authToken");

        // Notify the user
        alert("Logged out successfully");
        window.location.href = "/";

        
      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred while logging out. Please try again.");
      }
    },
  },
};
</script>
