<template>
  <form @submit.prevent="changeInfo" v-if="user">
    <div class="info" v-for="(value, key) of userProfilevFor" :key="key">
      <label :for="key">{{ key }}: </label>
      <input type="text" :id="key" :name="key" :disabled="!editing || key==='NAME'" v-model="userProfile[key]">
    </div>
    <p class="invalid" v-if="userProfile.INVALID" v-html="userProfile.INVALID"></p>
    <div class="buttons">
      <input type="submit" value="submit" v-show="editing">
      <input type="button" value="cancel" @click="editing=0" v-show="editing">
      <input type="button" value="edit" @click="editing=1" v-show="!editing">
      <input type="button" value="logout" @click="logoutRefresh" v-show="!editing">
    </div>
    <ul class="recommend" v-if="!userProfile.WAKA_ID">
      <li>To join leaderboard, fill your WAKA_ID in the form above</li>
      <li>Get your WAKA_ID <a href="https://wakatime.com/me">here</a>, your WAKA_ID is the string after '@' in the url field</li>
      <li>it's recoomended to set your profile to "public" <a href="https://wakatime.com/settings/profile">here</a></li>
    </ul>
  </form>   
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { editProfile, profile } from '../service/userService.js'

export default {
  computed: {
    ...mapState(['user']),
    userProfilevFor() {
      let a = {...this.userProfile}
      delete a.INVALID
      return a
    }
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
  .invalid {
    color: red;
    font-size: 10px;
    margin: 0;
  }
</style>
