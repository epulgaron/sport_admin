<template>
  <div class="app">
    <!-- begin app-wrap -->
    <div class="app-wrap">
      <!-- begin pre-loader -->
      <div class="loader">
        <div class="h-100 d-flex justify-content-center">
          <div class="align-self-center">
            <img src="/static/assets/img/loader/loader.svg" alt="loader">
          </div>
        </div>
      </div>
      <!-- end pre-loader -->

      <!--start login contant-->
      <login/>

      <!--end login contant-->
    </div>
    <!-- end app-wrap -->
  </div>
</template>

<script>
  import Vue from 'vue'
  import login from '../../views/site/login'

  export default {
    name: 'Login',
    props: {
      login: Function,
    },
    components: {
      login
    },
    beforeCreate () {

    },
    beforeDestroy () {
      const recaptchaScripts = document.querySelectorAll('script')
      for (let i = 0; i < recaptchaScripts.length; i += 1) {
        recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i])
      }
    },
    async beforeMount () {
      await Vue.loadScript('../../../static/assets/js/vendors.js').then(() => {
        Vue.loadScript('../../../static/assets/js/app.js')
      })
    },
    methods: {}
  }
</script>

<style scoped>

</style>
