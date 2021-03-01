import Vue from 'vue'
import App from './App'
import router from './config/router'
import VueJsModal from 'vue-js-modal'
import LoadScript from 'vue-plugin-load-script'
import Vuelidate from 'vuelidate'
import {state} from './config/store/'
import {TcModelMixin} from './components/shared/mixins/model_mixin'

import './components/shared'
import './assets/scss/main.scss'

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'
import '../node_modules/ag-grid-community/dist/styles/ag-theme-fresh.css'
import './assets/css/grid_btn.css'
import './assets/css/modal.css'
/* Antd */
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
/* Vue- noty */
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

/* Jquery */
window.$ = window.jQuery = require('jquery')

/* using components */
Vue.use(LoadScript)
Vue.use(VueNoty)
Vue.use(Antd)
Vue.use(Vuelidate)
/* Config */
Vue.use(VueJsModal, {
  dialog: true,
  dynamic: true
})
Vue.prototype.$store = state
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
