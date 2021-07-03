<template>
  <div class="container">
  <barNavigation

  />
 
 <div class="alert alert-warning" v-if="alertWarnning" >
  <p class="paragraphs-res">
   vuelva a intentar por favor
  </p>
  </div>

  <div class="padding-1-0">
  <label for="" class="form-label"> email  </label>
  <div class="form-main-input">
  <input type="text" placeholder="email" v-model="login.email" class="form-input">
  </div>
  </div>

  <div class="padding-1-0">
  <label for="" class="form-label"> password  </label>
  <div class="form-main-input">
  <input type="text" placeholder="email" v-model="login.password"  class="form-input">
  </div>
  </div>

  <div class="form-main-input"> 
  <div class="padding-2-0">
  <button class="button-mini" @click="sendData()"> login </button>
  </div>
  
  </div>

  <div class="cover-index">
  <img class="cover-index-image" src="@/assets/images/cover.jpg" alt="cover-index">
  </div>


  </div>
</template>

<script>
import barNavigation  from "~/components/header/bar";
import jwt  from "jsonwebtoken";
import { mapMutations } from "vuex";

export default {

  middleware : 'checkingState' ,


    data(){
    return {
     alertWarnning:false,
    login : {
    email : 'ezequiel@hotmail.com.ar',
    password : 'qwerty123',
    IDTOKEN : '',
    

    }
    }
    },

    components:{
    barNavigation

    },

    methods:{
    ...mapMutations({
      chargedToken : 'profile/chargedToken'


    }),

     

    async sendData (){

    const user = {
    email : this.login.email,
    password : this.password

    }

    let self = this

    jwt.sign({ user }, 'secretKey', (err, token) => {

  
    if(token){

    this.chargedToken( { token : token, email : self.login.email })
    console.log("login on");
    this.$router.push({ path : '/' })

    }else {
      this.alertWarnning = true
    console.log("not login");
    }

    })




    },
    }

}


</script>