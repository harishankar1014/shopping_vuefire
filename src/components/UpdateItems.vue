<template>
    <div>
        <form @submit="updateItem(name, image,description,stock)">
      <h2>Add a New Item</h2>
      <input v-model="name" placeholder="Item Name" class="input" required>
      <input v-model="image" placeholder="Item Image URL" class="input" required>
      <input v-model="stock" placeholder="Item Stock" class="input" required>
      <br>
      <div class="form-group">
          <label for="comment">Description</label>
          <!-- <input v-model="comment.comment"  type="text" class="form-control" name="comment" /> -->
          <textarea class="form-control" v-model="description" rows="5"></textarea>
      </div>
      <button type="submit" class="button">Update Item</button>
    </form>
    
    </div>
</template>
<script>
import firebase from 'firebase'
import { db } from '../main'
export default{
    name: 'Items',
  data () {
    return {
    //   items: [],
      name: this.$route.params.name,
      image: this.$route.params.image,
      description:this.$route.params.description,
      stock:this.$route.params.stock,
      collection:this.$route.params.collections,
      id:this.$route.params.id,
      email:this.$route.params.email,
      r:this.$route.params.ret
      // count:0
    }
  },
  methods:{
      updateItem (name, image,description,stock) {
      const createdAt = new Date()
      // const count=0
      db.collection(this.collection).doc(this.id).set({ name:name, image:image, createdAt:createdAt,stock:stock,description:description },{merge:true})
      // Clear values
    //   this.name = ''
    //   this.image = ''
    //   this.description = ''
      // this.stock=0
      this.$router.push('/shops');
    //   location.reload();
    }
  }
}
</script>