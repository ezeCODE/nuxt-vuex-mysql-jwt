
<template>
<div class="container">

  <barNavigation />

  <header >
  <p class="paragraphs padding-2-0 "> tu email es {{ EMAILPROFILE }}  </p>
  <h3  class="padding-2-0"> Mis publicaciones </h3>
  </header>

  
  <article>  
  <hr>
  <client-only>
  <div v-if="listProfilePost.length == [] ">
  <spinner

  />
  </div>

  <div v-else>  
  <table >
  <tr class="bg-silver-softh" >
  <th>Firstname</th>
  <th>email</th>
  <th>Age</th>
  <th>skills </th>
  <th> look profile </th>
  </tr>
  <tr v-for="(items, index) in listProfilePost " :key="index">
  <td> {{ items.fullName }}   </td>
  <td> {{ items.email }} </td>
  <td> {{ items.age }} </td>
  <td> {{ items.skills }}  </td>
  <td> <p class="cursr-pointer paragraphs" @click="selectedPost(items) "> {{ items.id }} editar </p>  </td>
 
  </tr>
  </table>
  </div>
  </client-only>

  <hr>
  </article>


  <div class="card-profile padding-2-0 text-center" >  
  <ul v-if="listProfileSelected.length == 0">
    <li> seleciona un item para editar </li>
  </ul>

  <ul v-else class="grid cols-5 vertical-center" v-for="(profile , index) in listProfileSelected" :key="index+'plus'">
  <li> me llamo  <strong>{{ profile.fullName }}  </strong></li>
  <li> el email es <strong> {{ profile.email }}  </strong> </li>
  <li> tienes  <strong>{{ profile.age }}</strong> años </li>
  <li> sabes,... <strong> {{ profile.skills }}</strong> </li>
  <li class="grid cols-2 vertical-center"> 
  <p class="paragraph  " @click="prepareLink( profile , profile.id )">  look & edit   </p>
   <button @click="deletePost( profile.id )" class="button-mini "> borrar</button>
   </li>
   
  </ul>
  </div>


  <div class="padding-2-0 "> 
  <button class="chat-btn-send" v-if="!renderModal" @click="renderModal = !renderModal"> publicar nuevo perfil </button>
  <button class="chat-btn-send"  v-else  @click="renderModal = !renderModal">  cancelar  </button>
  </div>

  <div class="alert alert-success" v-if="alertSuccess">
  <p class="paragraphs-res">
  {{ resText }}
  </p>
  </div>

  <div class="form-main" v-if="renderModal" >
  <div class="padding-1-0">
  <label for="" class="form-label"> nombre y apellido  </label>
  <div class="form-main-input">
  <input v-model="profileFullName" type="text" placeholder="me llamo..." class="form-input">
  </div>
  </div>

  <div class="padding-1-0">
  <label for="" class="form-label"> tu email  </label>
  <div class="form-main-input">
  <input v-model="profileEmail" type="text" placeholder="mi email es" class="form-input">
  </div>
  </div>

  <div class="padding-1-0">
  <label for="" class="form-label"> tu edad  </label>
  <div class="form-main-input">
  <input v-model="profileAge" type="text" placeholder="tengo" class="form-input">
  </div>
  </div>


 <!-- lectura en la base de datos -->
  <ul class="widgeth-ul"  >
  <li class="widgeth-li" 
  v-for="(skills, index) in listSkills" :key="index" 
  @click="addSkills(skills.name)"

  >  {{ skills.name }} </li>
  </ul>

  
  <label for="" class="form-label"> mis habilidades son  </label>
  <div class="form-main-input" v-if="mySkills" >
  <ul class="widgeth-ul max-content gap-2 ">

  <li v-for="(items, dats) in mySkills" :key="dats" class="button-mini" @click="outSkill(dats)">
  {{items}} X

  </li>
  </ul>
  </div>
  <hr>


  <div class="form-main-input"> 
  <div class="padding-2-0">
  <button class="button-mini bg-green-soft" :disabled="isDiabled" @click="checkingEmailExists()"> publicar perfil </button>
  </div>
  <div class="alert alert-warning" v-if="alertWarnning" >
  <p class="paragraphs-res">
    Ya existe un perfil con este email
  </p>
  </div>
  
  </div>


  </div>

 {{formState}}
  </div>
</template>
<script>
import { mapState , mapMutations } from 'vuex';
 
import barNavigation  from "~/components/header/bar.vue";
import spinner  from "~/components/spinner";
 
 

export default {
 
   components:{
   barNavigation ,
   spinner
    
   },

    data(){
    return {
    emailState: [],
    listProfileSelected: [],
    listProfilePost: [],
    renderModal:false,
    alertSuccess:false,
    alertWarnning:false,
    renderUpdate:false,
    isDiabled:false,
    mySkills: [],
    listSkills : [ {name: 'dev'} ,  {name:'css'} ,{name: 'html'} , {name:'javascript'} ],
    profileFullName : '',
    profileEmail : '',
    resText : '',
    profileAge :  0

    }
    },

   beforeDestroy(){
   this.listProfilePost, this.isDiabled, this.resText, this.listProfileSelected , this.mySkills, this.listSkills ,  this.dats , this.profileFullName , this.profileEmail , this.profileAge  = null


   },

    mounted(){

    setTimeout(() => {
    this.callmypost()
    }, 2000);

    },

    computed:{
    ...mapState({
    EMAILPROFILE : state => state.profile.emailProfile,
    TOKENPROFILE : state=> state.profile.tokenProfile

    }),

    formState :  function (){
    if(this.profileFullName != '' & this.profileEmail != '' & this.profileAge != '' & this.mySkills.length > 0 ){
      this.isDiabled = false

    }else { 
       this.isDiabled = true
    }

    },

  

    },

   methods:{
 ...mapMutations({
    DataUpdate  : 'profile/DataUpdate'

    }),

    selectedPost ( data ){
    
    this.listProfileSelected = []
    this.listProfileSelected.push(data)


    },

    prepareLink ( item , id){

    this.DataUpdate(item)

    setTimeout(() => {
    this.$router.push({ path : `/account/edit/${id}` })

    }, 1000);



    },


   async deletePost( id ){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${this.TOKENPROFILE}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": this.EMAILPROFILE,
    "id":  id

    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body :raw,
    redirect: 'follow'
    }

    await fetch(`http://localhost:3000/delete` , requestOptions).then( ()=>{

    this.alertSuccess = true
    this.resText = 'Publicaion borrada'

    this.listProfileSelected = []
    this.callmypost() 

    setTimeout(() => {
    this.alertSuccess = false
    this.resText = ''

    }, 5000);

    } )

    },

    async callmypost() {
      
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${this.TOKENPROFILE}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": this.EMAILPROFILE
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    }

    this.listProfilePost = await fetch('http://localhost:3000/selfPost' , requestOptions).then(  res => res.json() )


    },

 

  addSkills(skill){

  this.mySkills.push(skill)
  
  },

  outSkill(index){

  this.mySkills.splice(index, 1)

  },

    updatePost(data){
 
    this.renderUpdate = true

    },

    async checkingEmailExists (){

    var myHeaders = new Headers();
 
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "email": this.profileEmail
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'

    }

    this.emailState = await fetch('http://localhost:3000/findEmail' , requestOptions).then(  res => res.json() )

    this.emailState.length > 0 ? this.alertWarnning= true : this.uploadNewProfile()
    
    },

  uploadNewProfile(){

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${this.TOKENPROFILE}`);
  myHeaders.append("Content-Type", "application/json");

//  let emailTrim =  this.profileEmail.trim()

  var raw = JSON.stringify({
  email : this.profileEmail,
  age : parseInt(this.profileAge),
  fullName : this.profileFullName,
  skills : this.mySkills

  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'

  }
 
  
  fetch('http://localhost:3000/add' , requestOptions).then(()=>{
 
  this.alertSuccess = true
  this.renderModal = false
  this.resText = 'Publicación agregada con exito!!!'
  this.EMAILPROFILE == this.profileEmail ?   this.callmypost() : ''
   
   setTimeout(() => {
    this.alertSuccess = false
    this.resText = ''
   }, 5000);

  this.mySkills = []
  this.profileFullName = ''
  this.profileEmail = ''
   
  this.profileAge = 0

  }).catch(error => console.log('error', error));

  }

 
   }


}
</script>
 