<template>
<div class="container">

  <barNavigation />

  <header >
  <p class="paragraphs padding-2-0 "> Tu siguiente talento  </p>
  <h3  class="padding-2-0"> Haz búsqueda por habilidades disponibles, separa con una coma </h3>
  </header>

  <div class="">
  <div class="padding-1-0">
  <div class="form-main-input">
  <input  v-model="search"  @keyup="send()" type="text" placeholder="buscar " class="form-input">
  <button class="button-mini" @click="send()" > ver resultados </button>
  </div>
  </div>
 
  
<client-only>


  <div >  
  <table style="width:100%">
  <tr class="bg-silver-softh ">
  <th>Firstname</th>
  <th>email</th>
  <th>Age</th>
  <th>skills </th>
  <th> look profile </th>
  </tr>

  <tr v-for="(items, index) in SEARCHRESULTS " :key="index">
  <td> {{ items.fullname }} </td>
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
import barNavigation  from "~/components/header/bar.vue";

import { mapActions, mapMutations, mapState } from "vuex";


export default {

    components:{
    barNavigation ,
   

    },

    data(){
    return {
        search : ''

    }
    },

     computed:{
    ...mapState({
    TOKENPROFILE : state=> state.profile.tokenProfile,
    SEARCHRESULTS : state=> state.profile.searchResults

    }),
     },

     beforeDestroy(){
         this.clearDataResult()
     },

    methods:{
    ...mapActions({
    prepareSearchResult : 'profile/prepareSearchResult'
    }),

    ...mapMutations({
    DataUpdate  : 'profile/DataUpdate',
    clearDataResult  : 'profile/clearDataResult'

    }),

    

    send(){

        this.prepareSearchResult({
           token : this.TOKENPROFILE,
           search: this.search
        })

    },

    prepareLink ( item , id){

    this.DataUpdate(item)

    setTimeout(() => {
    this.$router.push({ path : `/account/edit/${id}` })

    }, 1000);



    },

    }


}
</script>
