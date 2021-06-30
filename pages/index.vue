<template>
  <div class="container">
  <barNavigation

  />


  <div class="cover-index">
  <img class="cover-index-image" src="@/assets/images/cover.jpg" alt="cover-index">
  </div>

<client-only>
      
  <table style="width:100%">
  <tr class="bg-silver-softh ">
    <th>Firstname</th>
    <th>email</th>
    <th>Age</th>
    <th>skills </th>
    <th> look profile </th>
  </tr>
  <tr v-for="(items, index) in listProfiles20 " :key="index">
    <td> {{ items.fullName }} </td>
    <td> {{ items.email }} </td>
    <td> {{ items.age }} </td>
    <td> {{ items.skills }}  </td>
    <td>  <n-link :to="`perfil/${items.id}`">  perfil {{items.id}} </n-link> </td>
  </tr>
</table>

</client-only>

  </div>
</template>
<script>
import barNavigation  from "../components/header/bar";

 
export default {

   components:{
     barNavigation



   },

  data(){
  return {
  listProfiles20: []

  }
  },

  beforeDestroy(){
    this.listProfiles20 = null
  },
 
  async fetch() {

  console.log("callData");
  this.listProfiles20 = await fetch('http://localhost:3000/readProfiles20').then(  res => res.json() )
  
  },

 
   


}
</script>
 