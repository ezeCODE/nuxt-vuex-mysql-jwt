
<template>
<div class="container">
  <barNavigation

  />

 
 <header>
   <p class="paragraphs padding-2-0 ">  {{ EMAILPROFILE }}  </p>
  <h3> Mis publicaciones </h3>
 </header>

  <article>  
  <hr>
  <client-only>
  <table style="width:100%">
  <tr class="bg-silver-softh " >
  <th>Firstname</th>
  <th>email</th>
  <th>Age</th>
  <th>skills </th>
  <th> look profile </th>
  </tr>
  <tr v-for="(items, index) in listProfilePost " :key="index">
  <td> {{ items.fullName }} </td>
  <td> {{ items.email }} </td>
  <td> {{ items.age }} </td>
  <td> {{ items.skills }}  </td>
  <td>  <n-link :to="`perfil/${items.id}`">  perfil {{items.id}} </n-link> </td>
  </tr>
  </table>

  </client-only>
  <hr>
  </article>

 
<div class="padding-2-0 "> 
<button class="chat-btn-send" v-if="!renderModal" @click="renderModal = !renderModal"> publicar nuevo perfil </button>
<button class="chat-btn-send"  v-else  @click="renderModal = !renderModal">  cancelar  </button>
</div>

  <div class="alert-success" v-if="alertSuccess">
  <p class="paragraphs-res">
  Publicación agregada con exito!!!
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

  <hr>
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
  <button class="button-mini" @click="sendData()"> publicar perfil </button>
  </div>
  </div>


</div>

 
  </div>
</template>
<script>
import { mapState } from 'vuex';
 
import barNavigation  from "~/components/header/bar.vue";
 
 
export default {
 
   components:{
   barNavigation ,
    
   },

    data(){
    return {
    listProfilePost: [],
    renderModal:false,
    alertSuccess:false,
    mySkills: [],
    listSkills : [ {name: 'dev'} ,  {name:'css'} ,{name: 'html'} , {name:'javascript'} ],
    profileFullName : '',
    profileEmail : '',
    profileAge :  0

    }
    },

   beforeDestroy(){
   this.listProfilePost,  this.mySkills, this.listSkills ,  this.dats , this.profileFullName , this.profileEmail , this.profileAge  = null


   },

    mounted(){

    setTimeout(() => {
      this.callmypost()
    }, 2000);

    },

    computed:{
      ...mapState({
        EMAILPROFILE : state => state.profile.emailProfile
      }),

  

    },

   methods:{

    async callmypost() {
      
    let self = this
    var raw = JSON.stringify ({ email : this.EMAILPROFILE }) 
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var sendData = {
    method: 'POST',
    headers: myHeaders,
    body: raw ,
    redirect: 'follow'

    };


    this.listProfilePost = await fetch('http://localhost:3000/selfPost' , sendData).then(  res => res.json() )
  
 
   

    },

 

  addSkills(skill){

  this.mySkills.push(skill)
  
  },

  outSkill(index){

  this.mySkills.splice(index, 1)

  },


  sendData(){

  let obj = {
  email : this.profileEmail,
  age : parseInt(this.profileAge),
  fullName : this.profileFullName,
  skills : this.mySkills

  }
  
  var raw = JSON.stringify(obj);
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var sendData = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'

  };

 

  fetch('http://localhost:3000/add' , sendData).then(response => response.text()) .then(()=>{
 
  this.alertSuccess = true
  this.renderModal = false
  this.EMAILPROFILE == this.profileEmail ?   this.callmypost() : ''
   
   setTimeout(() => {
     this.alertSuccess = false
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
 