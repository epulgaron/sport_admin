<template>
  <div class="app">
    <!-- begin app-wrap -->
    <div class="app-wrap">
      <!-- begin pre-loader -->
      <loader_overlay/>
      <!-- end pre-loader -->
      <!-- begin app-header -->
      <topbar/>
      <!-- end app-header -->
      <!-- begin app-container -->
      <div class="app-container">
        <!-- begin app-nabar -->
        <left_sidebar/>
        <!-- end app-navbar -->
        <!-- begin app-main -->
        <div class="app-main" id="main">
          <!-- begin container-fluid -->
          <div class="container-fluid">
            <!-- begin row -->
            <router-view></router-view>
            <!-- end task list contant -->
          </div>
          <!-- end container-fluid -->
        </div>
        <!-- end app-main -->
      </div>
      <!-- end app-container -->
      <!-- begin footer -->
      <footer_template/>
      <!-- end footer -->
    </div>
    <!-- end app-wrap -->
  </div>
</template>
<script>

  import Vue from 'vue'
  import footer_template from '../elements/footer_template'
  import loader_overlay from '../elements/loader_overlay'
  import topbar from '../elements/top_bar'
  import left_sidebar from '../elements/left_sidebar'

  export default {
    name: 'app',
    components: {
      footer_template,
      loader_overlay,
      topbar,
      left_sidebar
    },
    beforeCreate () {
    },
    created () {

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
  }
</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
