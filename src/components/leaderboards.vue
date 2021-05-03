<template>
  <div class="main">
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
        <th class="row" ><a :href="'https://wakatime.com/@'+e.WAKA_ID">{{ e.NICKNAME ? e.NICKNAME : e.NAME }}</a></th>
        <th class="row">{{ e.TOTAL }}</th>
        <th class="row">{{ e.AVG }}</th>
        <th class="row">{{ e.LANGUAGES }}</th>
        <th class="row">{{ e.EDITORS }}</th>
        <th class="row">{{ e.SYSTEMS }}</th>
      </tr>
    </tbody>
  </table>
  <div class="refresh" :style="refreshStyle" @click="refreshLeaderBoards">last updated: {{lastRefreshed}}</div>
  </div>
  <br>
  <a href="https://wakatime.com/dashboard" target="_blank" style="color:black;">Go to Dashboard -></a>
  <br>
  <a href="https://wakatime.com/settings/account" target="_blank" style="color:black;">Copy API KEY -></a>
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
    var lastRefreshed = ref('')
    var refreshStyle = ref({
      color: 'black',
      fontSize: '14px'
    })


    const refreshLeaderBoards = () => {
      getLeaderBoards().then(e => {
        leaderboards.value = e
        lastRefreshed.value = new Date().toTimeString().split(' ')[0]
        refreshStyle.value.color = 'green'
      }).catch(() => {
        refreshStyle.value.color = 'red'
        lastRefreshed.value = 'refresh Failed.'
      })
    }

    if (store.state.user) {
      refreshLeaderBoards()
      setInterval(refreshLeaderBoards, 1000*60*5)    
    }

    return {
      leaderboards,
      lastRefreshed,
      refreshStyle,
      refreshLeaderBoards,
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
  .main {
    position: relative;
  }
</style>
