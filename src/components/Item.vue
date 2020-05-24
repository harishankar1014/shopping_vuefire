<template>
  <div>
    <button class="button logout" v-on:click="logout">Logout</button>
    <!-- <h1>{{ $route.params.email }}</h1> -->
    <!-- <h1>{{ collection }}</h1> -->
    <div class="itemlist">
    <article class="covers" v-for="item in displayedItems" :key="item.name">
      <div>
        <img style="margin: 10px" :src="item.image" height="291px" width="192px">
        <p >{{ item.name }}</p>
        <br>
        <p >{{ item.price }}</p>
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
        <!-- <p v-if="item.stock==0">{{ reminder(item.name) }}</p> -->
        <button class="button" @click="deleteItem(item.id)">
          Delete
        </button>
        <p>{{ item.description }}</p>
        <br>
        <button>
        <router-link  :to="{name: 'Comment', params: { collections: collection,email:$route.params.email,item:item.name,comment:comment,ret:$route.params.collections }}" class="nav-link">View COmment</router-link>
        </button>
        <button>
        <router-link  :to="{name: 'Update', params: { collections:collection,id:item.id,name:item.name,image:item.image,stock:item.stock,description:item.description,email:$route.params.email,ret:$route.params.collections }}" class="nav-link">Update</router-link>
        </button>
      </div>
       <hr>
    </article>
    </div>
    <h1><button v-if="start+3 < length"   @click="start=start+3" >Next</button></h1>
    <h5><button  v-if="start !== 0 && start-3 >= 0"   @click="start=start-3" >Previous</button></h5>
    <div>
      <label>Add items from vendor</label>
      <router-link  :to="{name: 'buyitems',params:{collections:collection}}" class="nav-link">View Vendors</router-link>
    </div>

    <form @submit="addItem(name, image,description,stock,price)">
      <h2>Add a New Item</h2>
      <input v-model="name" placeholder="Item Name" class="input" required>
      <input v-model="image" placeholder="Item Image URL" class="input" required>
      <input v-model="price" placeholder="Item Price" class="input" required>
      <input v-model="stock" placeholder="Item Stock" class="input" required>
      <br>
      <div class="form-group">
          <label for="comment">Description</label>
          <!-- <input v-model="comment.comment"  type="text" class="form-control" name="comment" /> -->
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
      collection:this.$route.params.email+"_"+this.$route.params.collections,
      comment:this.$route.params.email+"_remarks",
      start:0
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
      // if(db.collection(this.collection).where('name','array-contains',name)!=null)
      // {
      //      console.log("item exists")
      // }
      // else
      // {
      //   db.collection(this.collection).add({ name, image, createdAt,stock,description,price })
      // }
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
      // var nodemailer = require('nodemailer');
      console.log("this works")
      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'parameshwari.it16@bitsathy.ac.in',
      //     pass: 'paramu   '
      //     }
      // });
      // var mailOptions = {
      //   from: 'parameshwari.it16@bitsathy.ac.in',
      //   to: this.email,
      //   subject: 'item required',
      //   text: this.item,
      // };
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //   }
      // });
      // let uri='http://localhost:4000/mail';
      // axios.post(uri,{"item":item,"email":this.email});

    }
  },
  computed:
    {
        displayedItems () {
      // return this.paginate(this.test);
      // var archived= this.items.comment.filter(c =>{ return c.archived == true});
      return this.items.slice(this.start,this.start+3);
    },
    length: function(){
            // console.log(this.len);
            // var archived= thi  s.content.comment.filter(c =>{ return c.archived == true});
            return this.items.length;
          return ret;
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