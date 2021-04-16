<template>
  <div class="leaderboards">
    <leaderboards />
  </div>
  <div class="login">
    <login />
  </div>
</template>

<script>
import leaderboards from './components/leaderboards.vue'
import login from './components/login.vue'

export default {
  name: 'App',
  components: {
    login,
    leaderboards,
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  margin-top: 20px;
}

.login {
  display: inline-block;
}

  .leaderboards {
    display: inline-block;
  }
</style>
