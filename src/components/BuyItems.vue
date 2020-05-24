<template>
    <div>
    <h1>Buy items here</h1>
    <br>
    {{ this.$route.params.collections }}
    <div class="distributorlist">
    <article class="covers" v-for="item in displayedDistributors" :key="item">
    <label>Distributor</label>
    <p>{{ item.email }}</p>
    <label>Brand</label>
    <p>{{ item.name }}</p>
    <br>
    <p>{{ database=item.email+"_"+item.name }}</p>
    <br>
    <router-link  :to="{name: 'vendorstock',params:{database:database,collections:collections}}" class="nav-link">View Stock</router-link>
    </article>
    <h1><button v-if="start+5 < length"   @click="start=start+1" >Next</button></h1>
    <h5><button  v-if="start !== 0 && start-5 >= 0"   @click="start=start-5" >Previous</button></h5>
    </div>
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
      database:'',
      start:0,
      collections:this.$route.params.collections
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
      shops: db.collection("brand")
      // role:'',
      // email:this.$route.params.email
    }
  },
  mounted(){
    // this.route();
  },
  methods: {
     
  },
  computed:
    {
        displayedDistributors () {
      // return this.paginate(this.test);
      // var archived= this.items.comment.filter(c =>{ return c.archived == true});
      return this.shops.slice(this.start,this.start+5);
    },
    length: function(){
            // console.log(this.len);
            // var archived= thi  s.content.comment.filter(c =>{ return c.archived == true});
            return this.shops.length;
          // return ret;
        }
    }
}
</script>
<style>
label{
  color: #e4dcde;
}
p{
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  color: #c7bfbf;
}
</style>
