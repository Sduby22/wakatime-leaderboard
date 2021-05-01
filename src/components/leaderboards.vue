<template>
  <table border="1">
    <thead>
      <tr>
        <th colspan="10">Hall of Fame</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="head">Rank</th>
        <th class="head">User</th>
        <th class="head">Hrs.Coded</th>
        <th class="head">Day.Avg</th>
        <th class="head">Languages</th>
        <th class="head">Editors</th>
        <th class="head">OS</th>
      </tr>
      <tr v-for="(e, index) of leaderboards" :key="e.NAME">
        <th class="row">{{ index + 1 }}</th>
        <th class="row" ><a :href="'https://wakatime.com/@'+e.WAKA_ID">{{ e.NICKNAME }}</a></th>
        <th class="row">{{ e.TOTAL }}</th>
        <th class="row">{{ e.AVG }}</th>
        <th class="row">{{ e.LANGUAGES }}</th>
        <th class="row">{{ e.EDITORS }}</th>
        <th class="row">{{ e.SYSTEMS }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { getLeaderBoards } from '../service/userService.js'

export default {
  props: ['number'],
  setup() {
    const store = useStore()
    var leaderboards = ref({})

    if (store.state.user) {
      getLeaderBoards().then(e => leaderboards.value = e)
      setInterval(() => {
        getLeaderBoards().then(e => leaderboards.value = e)
      }, 1000*60*5)    
    }

    return {
      leaderboards,
    }
  },
}
</script>

<style scoped>
  thead {
    background: grey;
    color: white;
  }
  .head {
    background: aliceblue;
  }
</style>
