<template>
<div>
    <p>email</p>
    {{ email}}
    <h1>Distributor Page</h1>
    <button class="button logout" v-on:click="logout">Logout</button>
    <div class="shops">
    <article class="covers" v-for="shop in shops" :key="shop.name">
      <div class="ind-shop">
        <!-- <img style="margin: 10px" :src="item.image" height="291px" width="192px"> -->
        <p >{{ shop.name }}</p>
        <router-link  :to="{name: 'brand_inventory',params:{email:email,name:shop.name}}" class="nav-link">View Stock</router-link>
        <br> 
        <button class="button" @click="deleteBrand(shop.id)">
          Delete
        </button>
        <hr>
      </div>
    </article>
    </div>
    <form @submit="addBrand(name)">
      <h2>Add a Brand</h2>
      <input v-model="name" placeholder="Shop Name" class="input" required>
      <!-- <input v-model="image" placeholder="Item Image URL" class="input" required> -->
      <!-- <input v-model="location" placeholder="Loaction" class="input" required> -->
      <br>
      <button type="submit" class="button">Add Brand</button>
    </form>
</div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Distributor',
  data () {
    return {
      shops: [],
      name: '',
      image: '',
      currentPlace: null,
      email:this.$route.params.email,
      collection:this.$route.params.email+'_distributor'
      // count:0
    }
  },
  firestore () {
    return {
      shops: db.collection(this.collection).orderBy('createdAt')
    }
  },
  methods: {
    addBrand (name) {
      const createdAt = new Date()
      db.collection(this.collection).add({ name,createdAt })
      db.collection('brand').add({ 'email':this.email,name })
      // Clear values
      this.name = ''
      this.image = ''
    },
    deleteBrand (id) {
      db.collection(this.collection).doc(id).delete()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
<style>
p{
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #c7bfbf;
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
.itemlist{
  overflow: auto;
   /* width: 200px; */
  height: 800px;
}
</style>