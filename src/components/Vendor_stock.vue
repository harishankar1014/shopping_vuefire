<template>
    <div>
        <h1>Vendor Stock</h1>
        {{ collections }}
        <br>
        {{ database }}
        <br>
        <div>
        <article class="covers" v-for="item in shops" :key="item.name">
        <div>
        <img style="margin: 10px" :src="item.image" height="291px" width="192px">
        <p >{{ item.name }}</p>
        <br>
        <p v-if=" item.stock == 0 " > Out of stock </p>
        <p v-if=" item.stock > 0 " >{{ item.stock }}</p>
        <button v-if="count>0" class="button" @click="removeItem(item.stock,item.id,item.name)">
          Remove from cart
        </button>
        <!-- <p v-if="item.stock==0 ">{{ reminder(item.name) }}</p> -->
        <button v-if=" item.stock > 0 " class="button" @click="addItem(item.stock,item.id,item.name)">
          Add to cart
        </button>
        <!-- <p v-if="item.stock==0">{{ reminder(item.name) }}</p> -->
        <button class="button" @click="deleteItem(item.id)">
          Delete
        </button>
        <p>{{ item.description }}</p>
        <br>
        <!-- <router-link  :to="{name: 'Comment', params: { collections: collection,email:$route.params.email,item:item.name,comment:comment }}" class="nav-link">View COmment</router-link> -->
        <!-- <router-link  :to="{name: 'Update', params: { collections:collection,id:item.id,name:item.name,image:item.image,stock:item.stock,description:item.description }}" class="nav-link">Update</router-link> -->
        </div>
       <hr>
       <hr>
        </article>
        <p>{{ cart }}</p>
        <br>
        <p>{{ length }}</p>
        <br>
        <!-- <p>{{  checkout_items }}</p> -->
        <br>
        <p>{{  stock }}</p>
        </div>
        <button class="button" @click="check_out()">
          check_out
        </button>
    </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
export default {
  name: 'Buy-items',
  data () {
    return {
      shops: [],
      database:this.$route.params.database,
      count:0,
      cart:[],
      index:0,
      length:0,
      checkout:[[]],
      checkout_items:[],
      collections:this.$route.params.collections,
      stock:0
    //   email:this.$route.params.email
    //   name: '',
    //   image: '',
    //   location:'',
    //   center: { lat: 45.508, lng: -73.587 },
    //   markers: [],
    //   places: [],
    //   currentPlace: null
      // count:0
    }
  },
  firestore () {
    return {
      shops: db.collection(this.database)
      // role:'',
      // email:this.$route.params.email
    }
  },
  mounted(){
    // this.route();
  },
  methods: {
     removeItem(stock,id,name)
    {
      stock=stock+1;
      this.count--;
      db.collection(this.database).doc(id).set({stock:stock},{merge:true})
        this.pop(name)
        this.getLength()
    },
    addItem(stock,id,name)
    {
      stock=stock-1;
      this.count++;
      db.collection(this.database).doc(id).set({stock:stock},{merge:true})
      this.cart.push(name)
      this.getLength()
    },
    pop(name){
          this.index=this.cart.indexOf(name)
      if(this.index!=-1){

       this.cart.splice(this.index, 1);
       }
       this.getLength()
    },
    getLength()
    {
        this.length= this.cart.length
        
    },
    itemNumber(cart)
    {  
        var a = [], b = [], prev;

         this.cart.sort();
    for ( var i = 0; i < this.length; i++ ) {
        if ( cart[i] !== prev ) {
            a.push(cart[i]);
            b.push(1);
           } else {
             b[b.length-1]++;
           }
          prev = cart[i];
    }

      return  [a, b];
    },
    check_out()
    {
       const createdAt = new Date()
       console.log("next")
       var test = this.itemNumber(this.cart)
       console.log("these are the items"+test[0])
       console.log("this is   the stock"+test[1])
        // var name=test[0]
        // var s=test[1]
        for(var i=0;i<test.length;i++)
        { 
          console.log("inside loop")
          var name=test[0][i]
          var s=test[1][i]
          // var stock
          // if(db.collection(this.collections).where('name','==',name))
          // {
              // db.collection(this.collections).where('name','==',name).set({stock:+s},{merge:true})
              // this.stock=db.collection(this.collections)[0]
              // console.log(stock[0])
          // }
          // else
          // {
            // console.log("new "+name)
            db.collection(this.collections).add({ name, image:null, createdAt,stock,description:null })
            // console.log("new "+name)
          // }
        }
      //  db.collection(this.collections).where('item','==',test[0][0])
      }
      // db.collection(this.$route.params.email)
      // db.collection("roles").where('email','==',this.collections)
    }
  }

</script>
