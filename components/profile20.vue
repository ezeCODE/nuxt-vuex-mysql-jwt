<template>
  <div>
    <table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
    <th>ver perfil</th>
  </tr>
  <tr v-for="(items, index) in 20 " :key="index">
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
    <td> ver perfil </td>
  </tr>
 
</table>
  </div>
</template>

<script>
  export default {
   data() {
      return {
       
      }
    },

 methods: {
     
    }


  }
</script>