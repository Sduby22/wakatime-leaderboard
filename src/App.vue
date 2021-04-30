<template>
  <div class="leaderboards">
    <leaderboards />
  </div>
  <div class="login">
    <login />
  </div>
  <div class="status">
    <status />
  </div>
</template>

<script>
import leaderboards from './components/leaderboards.vue'
import login from './components/login.vue'
import status from './components/status.vue'

export default {
  name: 'App',
  components: {
    login,
    leaderboards,
    status,
  }
}
</script>

<style>

  #app {
    font-family: 'Courier New', Courier, monospace;
    color: #2c3e50;
    margin-top: 20px;
  }

  .login {
    float: left;
  }

  .leaderboards {
    float: left;
  }

  .status {
    float: left;
  }
</style>
