<template>
     
    <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form  @submit.prevent="signUp">
      <p>{{ count=1 }}</p>
    <h1>Sign Up </h1>
    <input type="text" v-model="email" placeholder="Email address" class="input" required>
    <br/>
    <input type="password" v-model="password" placeholder="Password"  class="input" required>
    <br/>
    <div class="form-group">
          <button class="btn btn-primary btn-block" >
            <span>Sign Up</span>
          </button>
        </div>
    <!-- <button v-on:click="login" class="button">Enter</button> -->
    <!-- <p><router-link to="/signup">
      New Here? Create a new account
    </router-link></p> -->
    </form>
  </div>

  <div class="form-container sign-in-container">
    <!-- <img src="../assets/dc_logo.jpg" width="300px"> -->
    <form  @submit.prevent="login"> 
    {{ count=2 }}
    <h2>Login </h2>
    <input v-model="semail" type="text" class="input" placeholder="Email" required>
    <br>
    <input v-model="spassword" type="password" class="input" placeholder="Password" required>
    <br>
    <div class="form-group">
          <button class="btn btn-primary btn-block" >
            <span>Login</span>
          </button>
        </div>
    <!-- <button v-on:click="signUp" class="button">Sign Up!</button> -->
    <!-- <button class="button">
      <router-link to="/login">
        Back
      </router-link>
    </button> -->
    </form>
  </div>
  <div class="overlay-container">
        <div class="overlay">
        <div class="overlay-panel overlay-left">
            <h1>Hello</h1>
            <p>
              Returning user? click here to sign in
            </p>
            <button class="ghost" id="signIn">Sign In</button>
        </div>
        <div class="overlay-panel overlay-right">
            <h1>Welcome back</h1>
            <p>
              First Time? Click here to sign up
            </p>
            <button class="ghost" id="signUp">Sign Up</button>
        </div>
    </div>
  </div>
   </div>
</template>

<script>
//    const signUpButton = document.getElementById('signUp');
//    const signInButton = document.getElementById('signIn');
//    const container = document.getElementById('container');

//    signUpButton.addEventListener('click', () => {
//     container.classList.add('right-panel-active');
// });

// signInButton.addEventListener('click', () => {
    // container.classList.remove('right-panel-active');
// });
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: '',
        semail: '',
        spassword: '',
        count:0
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          // console.log(this.email)
           this.$router.replace({ name: 'Shops', params: { email: this.email } })
          // this.$router.replace('/shops')
        }).catch((err) => {
          alert(err.message)
        })
      },
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.semail, this.spassword).then((user) => {
          this.$router.replace('/login')
        }).catch((err) => {
          alert(err.message)
        });
      }
    },
    mounted(){
      // document.querySelector('#test2').addEventListener('click', function() { alert("HOVER2") })
       const signUpButton = document.getElementById('signUp');
       const signInButton = document.getElementById('signIn');
       const container = document.getElementById('container');

   signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });
  signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active'); 
  });
    }
  }
</script>
<style>
h1 {
    font-weight: bold;
    margin: 0;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

span {
    font-size: 12px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: transparent;
    border-color: #ffffff;
}

form {
    button {
    border-radius: 20px;
    border: 1px solid #ff4b2b;
    background-color: #ff4b2b;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}
.container {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    align-items: center;
    /* position: relative; */
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    /* min-height: 480px; */
}
.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 1;
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}
.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}
</style>

