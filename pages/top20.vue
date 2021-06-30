<template>
  <div class="container">
      <barNavigation

  />
  <div>
 
<client-only>
    <table style="width:100%">
  <tr class="bg-silver-softh ">
    <th>Firstname</th>
    <th>email</th>
    <th>Age</th>
    <th>skills </th>
      <th> look profile </th>
  </tr>
  <tr v-for="(items, index) in listProfiles " :key="index">
    <td> {{ items.fullName }} </td>
    <td> {{ items.email }} </td>
    <td> {{ items.age }} </td>
    <td> {{ items.skills }}  </td>
    <td>  <n-link :to="`perfil/${items.id}`">  perfil {{items.id}} </n-link> </td>
  </tr>
 
</table>
</client-only>



  </div>
  </div>
</template>
<script>
import barNavigation  from "../components/header/bar";
 
export default {


  components:{
  barNavigation ,


  },

  data(){
  return {
  listProfiles :  [],

  }
  },
 
   beforeDestroy(){
    this.listProfiles = null
  },


  async fetch() {

  this.listProfiles = await fetch('http://localhost:3000/readProfiles20').then(  res => res.json()  )

  },



 


}
</script>
 