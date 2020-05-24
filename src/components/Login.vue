<template>
  <div class="login">
    <img src="../assets/LOGO.jpg" width="300px">
    <br>
    <input 
      type="text" 
      v-model="email" 
      placeholder="Email address" 
      class="input" 
      required>
    <br/>
    <input 
      type="password" 
      v-model="password"
      placeholder="Password" 
      class="input" 
      required>
    <br/>
    <button v-on:click="login" class="button">Enter</button>
    <p><router-link to="/signup">
      New Here? Create a new account
    </router-link></p>
  </div>
</template>
<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          // console.log(this.email)
           this.$router.replace({ name: 'roles', params: { email: this.email } })
          // this.$router.replace('/shops')
        }).catch((err) => {
          alert(err.message)
        })
      }
    }
  }
</script>
<style>
html {
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
}
.input{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 15%;
}
body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}
a {
  color: #A9A9A9;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}
button {
    border-radius: 20px;
    border: 1px solid #000000;
    background-color: #3b3837;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
    margin-top: 25px;
    margin-bottom: 25px;
}
button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}
</style>