<template>
  <div class="sign-up">
    <!-- <img src="../assets/dc_logo.jpg" width="300px"> -->
    <img src="../assets/LOGO.jpg" width="300px">
    <br>
    <h3>Create a new account</h3>
    <input
      v-model="email" 
      type="text" 
      class="input" 
      placeholder="Email" 
      required>
    <br>
    <input 
      v-model="password"
      type="password" 
      class="input" 
      placeholder="Password" 
      required>
    <br>
    <label>SELECT ROLE</label>
    <select id="role" name="role" v-model="role" placeholder="ROLE">
            <option value="Retailer">Retailer</option>
            <option value="Distributor">Distributor</option>
    </select>
    <br>    
    <button v-on:click="signUp" class="button">Sign Up!</button>
    <button class="button">
      <router-link to="/login">
        Back
      </router-link>
    </button>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import { db } from '../main'
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: '',
        role:''
      }
    },
    methods: {
      signUp () {
        // db.collection("roles").add({ "email":this.email,"role":this.role })
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          db.collection("roles").add({ "email":this.email,"role":this.role })
          this.$router.replace('/login')
        }).catch((err) => {
          alert(err.message)
        });
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