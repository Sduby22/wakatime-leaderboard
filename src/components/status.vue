<template>
  <form @submit.prevent="changeInfo">
    <div class="info" v-for="(value, key, index) of _user" :key="key">
      <label :for="key">{{ key }}: </label>
      <input type="text" :id="key" :name="key" :value="value">
    </div>
  </form>   
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  setup() {

  }
}
</script>

<style scoped>

</style>
