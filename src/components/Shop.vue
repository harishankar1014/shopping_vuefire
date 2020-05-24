<template>
<div>
    <img src="../assets/LOGO.jpg" width="300px">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"> -->
    <br>
    <button class="button logout" v-on:click="logout">Logout</button>
    <div class="shops">
    <article class="covers" v-for="shop in shops" :key="shop.name">
      <div class="ind-shop">
        <!-- <img style="margin: 10px" :src="item.image" height="291px" width="192px"> -->
        <p >{{ shop.name }}</p>
        <router-link  :to="{name: 'Items', params: { collections: shop.name,email:$route.params.email }}" class="nav-link">View Stock</router-link>
        <br> 
        <button class="button" @click="deleteItem(shop.id)">
          Delete
        </button>
        <hr>
      </div>
    </article>
    </div>
    <form @submit="addShop(name)">
      <h2>Add a New Shop</h2>
      <input v-model="name" placeholder="Shop Name" class="input" required>
      <!-- <input v-model="image" placeholder="Item Image URL" class="input" required> -->
      <!-- <input v-model="location" placeholder="Loaction" class="input" required>
      <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      </div>
      <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" @click="center=m.position"> 
      </gmap-marker>
    </gmap-map> -->
      <br>
      <button type="submit" class="button">Add New Shop</button>
    </form>
</div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Shops',
  data () {
    return {
      shops: [],
      name: '',
      image: '',
      location:'',
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null
      // count:0
    }
  },
  firestore () {
    return {
      shops: db.collection(this.$route.params.email).orderBy('createdAt')
    }
  },
  mounted(){
      this.geolocate();
  },
  methods: {
    addShop (name) {
      const createdAt = new Date()
      db.collection(this.$route.params.email).add({ name,createdAt })
      // Clear values
      this.name = ''
      this.image = ''
    },
    deleteShops (id) {
      db.collection(this.$route.params.email).doc(id).delete()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
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
  /* background-image: url("../assets/LOGO.jpg"); */
  /* background-position: center; */
  /* background-size: 150%; */
  /* background-repeat: no-repeat; */
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
h2{
  color:#000000
}
p{
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: rgb(243, 235, 235);
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
/* html {
  background-color: #000000;
}
button {
    border-radius: 20px;
    border: 1px solid #000000;
    background-color: #ffffff;
    color: #A9A9A9;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}
div{
  background: #A9A9A9;
  padding: 12px 45px; */
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
/* }
button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}
form{
  background: #ffffff;
} */
</style>