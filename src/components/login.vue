<template>
  <form @submit.prevent="login" v-if="!user && islogin" class="login">
    <div>
      <label for="username">Username: </label>
      <input v-model="username" type="text" id="username" name="username" required>
    </div>
    <div>
      <label for="pass">Pass: </label>
      <input v-model="password" type="password" id="pass" name="pass" required>
    </div>
    <div class="buttons">
      <input type="submit" value="submit">
      <input @click="islogin=false" type="button" value="register">
    </div>
  </form> 
  <form @submit.prevent="register" v-if="!user && !islogin" class="register">
    <div>
      <label for="username">Username: </label>
      <input v-model="username" type="text" id="username" name="username" required>
    </div>
    <div>
      <label for="pass">Pass: </label>
      <input v-model="password" @input="validateConfirm" type="password" id="pass" name="pass" required>
    </div>
    <div>
      <label for="confirm">Confirm: </label>
      <input v-model="confirm" @input="validateConfirm" type="password" id="confirm" name="confirm" required>
    </div>
    <div class="buttons">
      <input type="submit" value="submit">
      <input @click="islogin=true" type="button" value="login">
    </div>
  </form> 
</template>

<script>
import { mapState, useStore } from 'vuex'
import { ref } from 'vue'
import { createHash } from 'crypto'

export default {
  computed: {
    ...mapState(['user'])
  },
  setup() {
    const passwdReg = /[a-zA-Z0-9._!@#$%^&*]+/
    const store = useStore()
    const {dispatch} = store
    var islogin=ref(true)
    var username = ref('')
    var password = ref('')
    var confirm = ref('')

    const getmd5 = (str) => {
      const salt = "823hd9"
      const md5 = createHash('md5')
      return md5.update(str+salt).digest('hex')
    }

    const validateConfirm = () => {
      let pass =document.getElementById('pass')
      let conf =document.getElementById('confirm')
      if (pass.value !== conf.value)
        conf.setCustomValidity('Passwords dont match ... ')
      else if (!passwdReg.test(pass.value))
        conf.setCustomValidity('Bad password')
      else
        conf.setCustomValidity('')
    }
  
    const login = () => {
      let user = {
        username: username.value,
        password: getmd5(password.value)
      }
      dispatch('login', user).then(() => {
        window.location.reload()
      })
    }

    const register = () => {
      let user = {
        username: username.value,
        password: getmd5(password.value)
      }
      dispatch('register', user).then(() => {
        window.location.reload()
      })
    }
    return {
      validateConfirm,
      islogin,
      login,
      register,
      username,
      password,
      confirm,
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  form {
    display: table;
  }
  form>div {
    display: table-row;
  }
  form>div>* {
    display: table-cell;
  }
</style>
