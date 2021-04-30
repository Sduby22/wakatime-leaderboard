<template>
  <form @submit.prevent="changeInfo" v-if="user">
    <div class="info" v-for="(value, key) of userProfile" :key="key">
      <label :for="key">{{ key }}: </label>
      <input type="text" :id="key" :name="key" :disabled="!editing || key==='NAME'" v-model="userProfile[key]">
    </div>
    <div class="buttons">
      <input type="submit" value="submit" v-show="editing">
      <input type="button" value="cancel" @click="editing=0" v-show="editing">
      <input type="button" value="edit" @click="editing=1" v-show="!editing">
      <input type="button" value="logout" @click="logoutRefresh" v-show="!editing">
    </div>
    <div class="recommend">It's recoomended to set your profile to "public" <a href="https://wakatime.com/settings/profile">here</a></div>
  </form>   
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { editProfile, profile } from '../service/userService.js'

export default {
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    changeInfo() {
      this.editing = 0;
      editProfile(this.userProfile).then(
        window.location.reload()
      )
    },
    logoutRefresh() {
      this.logout()
      window.location.reload()
    }
  },
  data() {
    return {
      editing: 0,
      userProfile: {}
    }
  },
  mounted() {
    if (this.user) {
      profile().then(e => {
        this.userProfile = e.data
      })
    }
  }
}
</script>

<style scoped>
  .form {
    display: table;
  }
  .form > div {
    display: table-row;
  }
  input:disabled {
    border: none;
    background:transparent;
  }
  label, input {
    display:table-cell;
  }
  .recommend {
    font-size: 10px;
    width: 200px;
  }
</style>
