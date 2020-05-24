<template>
  <div>
    <!-- <button class="button logout" v-on:click="logout">Logout</button> -->
    <h1>Brand items</h1>
    <!-- <h1>{{ $route.params.email }}</h1> -->
    <!-- <h1>{{ $route.params.email }}</h1> -->
    <h1>{{ collection }}</h1>
    <!-- <h1>{{ items[0].name }}</h1> -->
    <article class="covers" v-for="item in items" :key="item.name">
      <div>
        <img style="margin: 10px" :src="item.image" height="291px" width="192px">
        <p >{{ item.name }}</p>
        <br>
        <p v-if=" item.stock == 0 " > Out of stock </p>
        <p v-if=" item.stock > 0 " >{{ item.stock }}</p>
        <button class="button" @click="addCount(item.stock,item.id)">
          +1
        </button>
        <p v-if="item.stock==0">{{ reminder(item.name) }}</p>
        <button v-if=" item.stock > 0 " class="button" @click="reduceCount(item.stock,item.id)">
          -1
        </button>
        <button class="button" @click="deleteItem(item.id)">
          Delete
        </button>
        <p>{{ item.description }}</p>
        <br>
        <router-link  :to="{name: 'Comment', params: { collections: collection,email:$route.params.email,item:item.name,comment:comment }}" class="nav-link">View COmment</router-link>
        <router-link  :to="{name: 'Update', params: { collections:collection,id:item.id,name:item.name,image:item.image,stock:item.stock,description:item.description }}" class="nav-link">Update</router-link>
      </div>
       <hr>
    </article>

    <form @submit="addItem(name, image,description,stock,price)">
      <h2>Add a New Item</h2>
      <input v-model="name" placeholder="Item Name" class="input" required>
      <input v-model="image" placeholder="Item Image URL" class="input" required>
      <input v-model="price" placeholder="Item Price" class="input" required>
      <input v-model="stock" placeholder="Item Stock" class="input" required>
      <br>
      <div class="form-group">
          <label for="comment">Description</label>
          <textarea class="form-control" v-model="description" rows="5"></textarea>
      </div>
      <button type="submit" class="button">Add New Item</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Items',
  data () {
    return {
      items: [],
      name: '',
      image: '',
      description:'',
      stock:0,
      price:0,
      email:this.$route.params.email,
      collection:this.$route.params.email+"_"+this.$route.params.name
    //   comment:this.$route.params.email+"_remarks"
      // count:0
    }
  },
  firestore () {
    return {
      items: db.collection(this.collection)
    }
  },
  methods: {
    addItem (name, image,description,stock,price) {
      const createdAt = new Date()
      // const count=0
      db.collection(this.collection).add({ name, image, createdAt,stock,description,price })
      // Clear values
      this.name = ''
      this.image = ''
      this.description = ''
      // this.stock=0
    },
    deleteItem (id) {
      db.collection(this.collection).doc(id).delete()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addCount(stock,id)
    {
      stock=stock+1;
      db.collection(this.collection).doc(id).set({stock:stock},{merge:true})
    },
    reduceCount(stock,id)
    {
      stock=stock-1;
      db.collection(this.collection).doc(id).set({stock:stock},{merge:true})
    },
    reminder(item)
    {
      console.log("this works")
      let uri='http://localhost:4000/mail';
      axios.post(uri,{"item":item,"email":this.email});

    }
  }
}
</script>