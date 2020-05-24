<template>
    <div>
        <!-- <button class="button logout" v-on:click="logout">Logout</button>  -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
        <header class="jumbotron">
          <button class="button logout" v-on:click="logout">Logout</button>
          <h1>{{ item }}</h1>
        <div class=scroll>
        <article class="covers" v-for="remark in remarks" :key="remark.remark">
              <!-- <div class="card w3-hover-shadow"> -->
              <div class="container">
                <p>COMMENT</p>
                <p>{{ remark.remark }}</p>
                <br>
                <p>Store {{ remark.shop }}</p>
                <br>
                <button class="btn btn-danger" @click="deleteRemark(remark.id)">
                  Delete
                </button>
              </div>
              <!-- </div> -->
        </article>
        </div>
        <!-- </header> -->
        <!-- <h1>{{ $route.params.email }}</h1> -->
        <!-- <h1>{{ $route.params.item }}</h1> -->
        <!-- <h1>{{ $route.params.collections }}</h1> -->
        <form name="form" @submit.prevent="addComment" >
        <div class="form-group">
          <!-- <label for="title">Title</label> -->
          <!-- <h1>{{ item }}</h1> -->
          <!-- <input v-model="comme"  type="text" class="form-control" name="title" /> -->
        </div>
        <div class="form-group">
          <label for="comment">Comment</label>
          <textarea class="form-control" v-model="remark" rows="5"></textarea>
        </div>
        
        <div class="form-group">
          <button class="btn btn-primary btn-block" >
            <span>Submit</span>
          </button>
        </div>
        </form>
        <button>
          <router-link  :to="{name: 'Items',params:{collections:r,email:email}}" class="nav-link">Back to items</router-link>
        </button>
        </header>
    </div>
</template>
<script>
import axios from 'axios';
import firebase from 'firebase'
import { db } from '../main'
export default {
  name:'Comments',
  data () {
    return {
      // remarks:db.collection(this.$route.params.comment),
      remarks:[],
      item: this.$route.params.item,
      email:  this.$route.params.email,
      shop: this.$route.params.collections,
      remark:'',
      collection:this.$route.params.email+"_remarks",
      r:this.$route.params.ret
      // count:0
    }
},
firestore () {
    return {
      remarks: db.collection(this.collection).where('item', '==',this.item)
    }
  },
  methods:{
    addComment () {
      console.log('comment inserted')
      const createdAt = new Date()
      // const count=0
      var item=this.item
      var shop= this.shop
      var remark = this.remark
      db.collection(this.collection).add({ item, shop, remark })
      // Clear values
      // this.name = ''
      // this.image = ''
      this.remark = ''
      // this.stock=0
    },
    deleteRemark (id) {
      db.collection(this.collection).doc(id).delete()
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
  }
}
</script>

<style >
html {
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
  /* background-image: url("../assets/LOGO.jpg"); */
  /* background-position: center; */
  /* background-size: 150%; */
  /* background-repeat: no-repeat; */
}
.card{
    /* Add shadows to create the "card" effect */
    /* height: 280px; */
    /* width: 200px; */
    /* background-color:; */
    /* border-radius: 10px; */
    /* box-shadow: -1rem 0 3rem #000; */
    /* width: 2000px; */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
  }
.card-header{
  /* border-style: double; */
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
  background-color:#A9A9A9;
  width: 2000px;
}
.card-body{
  width: 2000px;
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
}
.card-footer{
  width: 2000px;
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);

}
.jumbotron{
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
}
.form-group{
  background-color: #757575;
  /* background: -webkit-linear-gradient(to bottom, #757575, #000000); */
  /* background: linear-gradient(to bottom, #000000, #757575); */
}
/* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
  
  /* Add some padding inside the card container */
  .container {
    width: 1300px;
    background-color: #000000;
    background: -webkit-linear-gradient(to bottom, #757575, #000000);
    background: linear-gradient(to bottom, #000000, #757575);
    padding: 2px 16px 20px;
  }
  .form-group{
    background-color:#A9A9A9;
  }
  .scroll{
  background-color: #000000;
  background: -webkit-linear-gradient(to bottom, #757575, #000000);
  background: linear-gradient(to bottom, #000000, #757575);
  overflow: auto;
   /* width: 200px; */
  height: 400px;
  width:100%;
  }
  .covers{
    margin:20px
  }
</style>