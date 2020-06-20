<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getToken } from './utils/auth'
import { getInfo } from './api/user'
export default {
  name: 'App',
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const token = getToken()
      if (token) {
        getInfo().then(res => {
          this.$store.dispatch('user/setInfo', res.data)
        })
      }
    }
  }
}
</script>
