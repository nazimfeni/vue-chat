<template>

    <div id="app">
      <div class="chat-container">
        <h1 class="title">Real-Time Chat</h1>
        <div class="chat-box">
          <div v-for="msg in messages" :key="msg.id" class="message">
            <strong class="user">{{ msg.user }}</strong>: 
            <span class="text">{{ msg.message }}</span>
          </div>
        </div>
        <form @submit.prevent="sendMessage" class="chat-form">
          <input 
            v-model="user" 
            placeholder="Your Name" 
            class="input user-input" 
            required 
          />
          <input 
            v-model="message" 
            placeholder="Type a message" 
            class="input message-input" 
            required 
          />
          <button type="submit" class="btn">Send</button>
        </form>
      </div>
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
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    background-color: #f4f4f9;
    color: #333;
  }
  
  #app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .chat-container {
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }
  
  .title {
    background-color: #4caf50;
    color: #fff;
    padding: 15px;
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  
  .chat-box {
    padding: 10px;
    height: 400px;
    overflow-y: auto;
    border-bottom: 1px solid #ddd;
  }
  
  .message {
    margin-bottom: 10px;
    padding: 8px 10px;
    border-radius: 5px;
    background: #f9f9f9;
  }
  
  .user {
    font-weight: bold;
    color: #4caf50;
  }
  
  .text {
    color: #555;
  }
  
  .chat-form {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f7f7f7;
  }
  
  .input {
    flex: 1;
    padding: 10px;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .user-input {
    max-width: 30%;
  }
  
  .message-input {
    flex-grow: 2;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  </style>
  