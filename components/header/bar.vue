<template>
<div class="bar">

  <ul class="bar-ul">
  <li class="bar-li"> <n-link to="/" class="bar-li-link"> Inicio </n-link> </li>
  <li class="bar-li"> <n-link to="/top20"  class="bar-li-link"> top 20 perfiles </n-link> </li>
  <li class="bar-li" v-if="TOKENPROFILE !=''" > <n-link to="/account"  class="bar-li-link"> publicar </n-link> </li>
  <li class="bar-li" v-else > <n-link to="/login"  class="bar-li-link">  login </n-link> </li>
 
  <li class="bar-li"  v-if="TOKENPROFILE !=''"   > <n-link to="/account/search"  class="bar-li-link">  buscar talentos </n-link>  </li>
  <li class="bar-li"  v-else  >  <n-link to="/login"  class="bar-li-link">  buscar talentos </n-link> </li>
    <li class="bar-li  "  v-if="TOKENPROFILE !=''"  @click="deleteToken()" >   cerrar session  </li>
   
  </ul>
 
 
</div>
</template>
<script>
import { mapMutations, mapState } from "vuex";


export default {

  computed:{
  ...mapState({
  TOKENPROFILE : state => state.profile.tokenProfile
  })

  },


  methods:{

  ...mapMutations({
  deleteToken : 'profile/deleteToken'

  })

  }

}
</script>
<style lang="scss">
@import "@/assets/styles/_screen";

 

.bar{ 
   @include desktop {
  &:before { content: ""; width: 10000px;   left: 0em; height: 60px; 
  background: rgb(255, 255, 255);z-index:-1 ;  border-bottom: 2px red solid;
  
  }

  }
  
  position: fixed; top: 0px; background: #dff5ff; width: 90%; height: 100%; z-index: 6000;
  margin-left: -100%; transition: margin-left .5s ease-in-out ;
  @include desktop { left: 0em ; margin-left: 0%; width: 100%; max-width: 1600px; 
  position: relative; height: 60px; z-index: 700;
  background: #ffffff;
  border-bottom: 2px red solid;
   
  }
  
}

.bar-render{ margin-left: 0%; }

.bar-ul{ width: 100%; display: grid; grid-template-columns: repeat(1, 1fr); align-content: flex-start;
    @include desktop { grid-template-columns: repeat(5, max-content); align-items: flex-start; }
    height: 100%; 
    
}

.bar-li{ position: relative; font-weight: 700; text-align: start;  box-sizing: border-box; padding: 1em 1em;
  overflow: hidden;  z-index: 1;
  @include tablet { line-height: 2em; }

}

.bar-li-link{ list-style: none; font-size: 1.2em;  font-family: 'Roboto', sans-serif;
  color: rgb(0, 0, 0); text-decoration: none; cursor: pointer;  
  &:after { display: block;position: absolute;  margin: 0;
  top: 0; bottom: 0; left: 0; right: 0; content: '.'; color: transparent;  width: 1px;
  height: 1px; border-radius: 50%; background: transparent;

  }

  &:hover:after { animation: circle 1.5s ease-in forwards; }

  @include tablet {  color: rgb(88, 24, 24);  }

}
 

@keyframes circle {
  0% {
    width: 1px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 1px;
    z-index: -1;
      background: rgb(224, 224, 224);
    border-radius: 100%;
  }
  100% {
    background: #eee;
    height: 5000%;
    width: 5000%;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 0;
  }
}




</style>