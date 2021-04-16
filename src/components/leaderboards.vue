<template>
  <table border="1">
    <thead>
      <tr>
        <th colspan="10">Hall of Fame</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Hrs.Coded</th>
        <th>Day.Avg</th>
        <th>Languages</th>
        <th>Editors</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue'
import { getLeaderBoards } from '../service/userService.js'

export default {
  props: ['number'],
  setup() {
    var leaderboards = ref({})

    setInterval(() => {
      leaderboards = getLeaderBoards()
    }, 1000*60*15)    

    return {
      leaderboards
    }
  } 
}
</script>

<style scoped>
  thead {
    background: grey;
    color: white;
  }
  tbody >>> th {
    background: aliceblue;
  }
</style>
