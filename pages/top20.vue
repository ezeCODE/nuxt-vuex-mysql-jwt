<template>
  <div class="container">
      <barNavigation

  />
  <div>
 
  <client-only>
  <div v-if="listProfiles.length == [] ">
  <spinner

  />
  </div>

  <div v-else>  
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
   <td v-if="TOKENPROFILE" >  <p @click="prepareLink(items,items.id)">  look & edit   {{  items.id  }}  </p> </td>
  </tr>
  </table>
  </div>
  </client-only>


 
  </div>
  </div>
</template>
<script>
import barNavigation  from "../components/header/bar";
import spinner  from "../components/spinner";
import { mapMutations, mapState } from "vuex";


export default {


  components:{
  barNavigation ,
  spinner


  },

  data(){
  return {
  listProfiles :  [],

  }
  },

   computed:{
    ...mapState({
    TOKENPROFILE : state=> state.profile.tokenProfile

    }),

    },

   beforeDestroy(){
  this.listProfiles = null
  },


  async fetch() {

  this.listProfiles = await fetch('http://localhost:3000/readProfiles20').then(  res => res.json()  )

  },

  methods:{
  ...mapMutations({
  DataUpdate  : 'profile/DataUpdate'
  }),

  prepareLink ( item , id){

  this.DataUpdate(item)

  setTimeout(() => {
  this.$router.push({ path : `/account/edit/${id}` })

  }, 1000);



  }
  }



 


}
</script>
 