<template>
  <div id="app">
    <h1>Real-Time Chat</h1>
    <div class="chat-box">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong>{{ msg.user }}:</strong> {{ msg.message }}
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="user" placeholder="Your Name" required />
      <input v-model="message" placeholder="Type a message" required />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      user: '',
      message: ''
    };
  },
  mounted() {
    this.fetchMessages();
    this.$socket.on('receiveMessage', (msg) => {
      this.messages.push(msg);
    });
  },
  methods: {
    fetchMessages() {
      axios.get('http://localhost:8000/api/messages').then((response) => {
        this.messages = response.data;
      });
    },
    sendMessage() {
  const newMessage = {
    user: this.user,
    message: this.message
  };

  // Emit to the Socket.IO server
  this.$socket.emit('sendMessage', newMessage);

  // Save to the database via Laravel API
  axios.post('http://localhost:8000/api/messages', newMessage)
    .then(response => {
      console.log('Message saved:', response.data);
    })
    .catch(error => {
      console.error('Error saving message:', error.response.data);
    });

  this.message = ''; // Clear the input
}
  }
};
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.chat-box {
  border: 1px solid #ddd;
  padding: 10px;
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 10px;
}
.message {
  margin-bottom: 5px;
}
</style>
