<template>
     <div>
         {{ $route.params.email}}
         <br>
         {{ route(shops[0].role) }}
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
      email:this.$route.params.email
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
      shops: db.collection("roles").where('email','==',this.$route.params.email)
      // role:'',
      // email:this.$route.params.email
    }
  },
  mounted(){
    // this.route();
  },
  methods: {
     route(role){
       console.log(role)
       if(role=="Distributor")
       {
         console.log("This is a distributor")
         this.$router.replace({ name: 'distributor',params: { email: this.email } })
       }
       if(role=="Retailer")
       {
         console.log("This is a retailer")
         this.$router.replace({ name: 'Shops', params: { email: this.email } })
       }
      // console.log("test")
     }
  }
}
</script>