<template>
<div class="container">

  <barNavigation />

 
  <header>
  <p class="paragraphs padding-2-0 ">Actualizar perfil  {{ DATAPOSTSELECTED[0].email }}   </p>
 
  </header>
 
  <div class="card-profile padding-2-0 text-center" >  
    <ul v-if="DATAPOSTSELECTED.length == 0">
    <li> vuelva a intentar </li>
    </ul>
 
  <ul v-else class="grid cols-5 vertical-center" v-for="(profile , index) in DATAPOSTSELECTED" :key="index+'plus'">
  <li> me llamo  <strong>{{ profile.fullName }}  </strong></li>
  <li> el email es <strong> {{ profile.email }}  </strong> </li>
  <li> tienes  <strong>{{ profile.age }}</strong> años </li>
  <li> sabes,... <strong> {{ profile.skills }}</strong> </li>
 
  </ul>
  </div>


  <p class="paragraphs padding-2-0"> 
    es un test, donde solo se actualiza el registo skills, mediente el email, <br>
    pero de ser necesario tambien se puede actualiar estos datos. </p>
    
  <div class="form-main" v-for=" (items, index) in DATAPOSTSELECTED " :key="index" >
  <div class="padding-1-0">
  <label for="" class="form-label"> nombre y apellido  </label>
  <div class="form-main-input">
  <input disabled v-model="items.fullName" type="text" placeholder="me llamo..." class="form-input">
  </div>
  </div>

  <div class="padding-1-0">
  <label for="" class="form-label"> tu edad  </label>
  <div class="form-main-input">
  <input disabled v-model="items.age" type="text" placeholder="tengo" class="form-input">
  </div>
  </div>

  <label for="" class="form-label"> habilidades disponibles </label>
  <ul class="widgeth-ul"  >
  <li class="widgeth-li" 
  v-for="(skills, index) in listSkills" :key="index" 
  @click="addSkills(skills.name)"

  >  {{ skills.name }} </li>
  </ul>

  <hr>
  <label for="" class="form-label"> habilidades  selecionadas </label>
  <div class="form-main-input" v-if="mySkills" >
  
  <ul class="widgeth-ul max-content gap-2 ">
 
  <li v-for="(items, dats) in  skillsProfile" :key="dats" class="button-mini" @click="outSkill(dats)">
  {{items}} X

  </li>
  </ul>
  </div>
  <hr>


  <div class="form-main-input"> 
  <div class="padding-2-0">
  <button class="button-mini bg-green-soft" :disabled="isDiabled" @click="updateProfile()"> Listo, actualizar </button>
  </div>
   <div class="alert alert-success" v-if="alertSuccess" >
  <p class="paragraphs-res">
  Perfil actualizado con exito
  </p>
  </div>
  </div>


</div>


  </div>
</template>
<script>
import barNavigation  from "~/components/header/bar";
import { mapMutations, mapState } from "vuex";

export default {


    components:{
    barNavigation
    
    },

    data(){
    return {
    dataProfile : [],
    skillsProfile : [],
    listProfileSelected: [],
    newProfileFullName : '',
    newProfileEmail : '',
 
    newProfileAge :  0,
    listSkills : [ {name: 'dev'} ,  {name:'css'} ,{name: 'html'} , {name:'javascript'} ],
    mySkills: [],
    alertSuccess:false,
    isDiabled:false,

    }
    },

    beforeDestroy(){
    this.listProfileSelected , this.dataProfile, this.skillsProfile, this.newProfileFullName ,  this.newProfileEmail  = null
    this.newProfileAge , this.listSkills, this.mySkills,this.alertSuccess , this.isDiabled = null
    this.clearDataUpdate()

    },

    computed:{
    ...mapState({
    DATAPOSTSELECTED :   state => state.profile.dataPostSelected,
    TOKENPROFILE : state=> state.profile.tokenProfile


    })

    },

    mounted(){
    this.prepareDataProfile()

    },

    methods:{
    ...mapMutations({
    clearDataUpdate : 'profile/clearDataUpdate'

    }),

   async updateProfile(){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${this.TOKENPROFILE}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    email : this.DATAPOSTSELECTED[0].email,
    skills : this.skillsProfile

    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'

    }


   await fetch('http://localhost:3000/update' , requestOptions).then(( res )=>{

    this.alertSuccess = true
  
    setTimeout(() => {
    this.alertSuccess = false
 
    }, 5000);


    }).catch(error => console.log('error', error));

    

    },

    addSkills(skill){

    this.skillsProfile.push(skill)

    },

    outSkill(index){

    this.skillsProfile.splice(index, 1)

    },

    async prepareDataProfile() {
           
    let  { skills } = await this.DATAPOSTSELECTED[0]

    this.skillsProfile = skills.split(',')



    }

   
    }

     

}

</script>
