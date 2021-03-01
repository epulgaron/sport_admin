<template>
  <a-config-provider>
    <div>
      <Home v-if="auth"/>
      <Login v-if="!auth"/>
    </div>
  </a-config-provider>
</template>
<script>
import es_ES from 'ant-design-vue/lib/locale-provider/es_ES'
import Login from './components/layout/templates/Login'
import Home from './components/layout/templates/Home'

export default {
  name: 'app',
  provide: function () {
    return {
      logout: this.logout,
      login: this.login
    }
  },
  data () {
    return {
      es_ES,
      auth:this.$store.site.user ==null
    }
  },
  computed: {

  },

  methods: {
    logout () {
      this.auth = this.$store.site.logout()
    },
    login () {
      this.auth = this.$store.site.user
    }
  },
  components: {Login, Home},
  mounted () {
  }
}
</script>

<style scoped>
</style>
