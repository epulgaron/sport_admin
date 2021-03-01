<template>
  <div class="app-contant">
    <div class="bg-white">
      <div class="container-fluid p-0">
        <div class="row no-gutters">
          <div class="col-sm-6 col-lg-5 col-xxl-3  align-self-center order-2 order-sm-1">
            <div class="d-flex align-items-center h-100-vh">
              <div class="login p-50">
                <h1 class="mb-2">Sport Test Pro</h1>
                <p>Bienvenido, entre sus credenciales</p>
                <div v-if="error" class="alert alert-icon alert-inverse-danger" role="alert">
                  <i class="fa fa-info-circle"></i><span style="margin: 1rem">{{message_error}}</span>
                </div>
                <tc-form
                  nested="user"
                  :vobject="$v"
                  ref="form"
                  class="mt-3 mt-sm-5">

                  <div class="row">
                    <div class="col-12">
                      <tc-form-item>
                        <label class="control-label">Correo*</label>
                        <tc-input type="text" v-model.trim="user.username" name="username" placeholder="Username" class="login-input"/>
                      </tc-form-item>
                    </div>
                    <div class="col-12">
                      <tc-form-item>
                        <label class="control-label">Contraseña*</label>
                        <tc-input type="password" name="password" v-model.trim="user.password" placeholder="Password"/>
                      </tc-form-item>
                    </div>
                    <div class="col-12">
                      <!--                      <div class="d-block d-sm-flex  align-items-center">-->
                      <!--                        <div class="form-check">-->
                      <!--                          <input class="form-check-input" type="checkbox" id="gridCheck">-->
                      <!--                          <label class="form-check-label" for="gridCheck">-->
                      <!--                            Remember Me-->
                      <!--                          </label>-->
                      <!--                        </div>-->
                      <!--                      </div>-->
                    </div>
                    <div class="col-12 mt-3">
                      <a-button  class="text-uppercase" :loading="loading" @click="login_action">
                        Entrar
                      </a-button>
                    </div>
                  </div>
                </tc-form>

              </div>
            </div>
          </div>
          <div class="col-sm-6 col-xxl-9 col-lg-7 bg-gradient o-hidden order-1 order-sm-2">
            <div class="row align-items-center h-100">
              <div class="col-7 mx-auto ">
                <img class="img-fluid" src="/static/assets/img/bg/login.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {required,} from 'vuelidate/lib/validators'

  export default {
    name: 'login',
    inject: {
      login: { default: ()=>{} }
    },
    validations: {
      user: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    data () {
      return {
        user: {
          username: '',
          password: '',
        },
        error:false,
        loading:false,
        message_error:'Error en usuario y contraseña'
      }
    },
    methods:{
      async login_action(){
        this.error=false
        this.loading=true
        await this.$store.site.login(this.user).then(()=>{this.login()}).catch((error)=>{
          !error.response||error.response.status!=422?this.message_error="Error desconocido , contacte con el administrador del sitio":''
          this.error=true
        })
        this.loading=false
      }
    }
  }
</script>

<style scoped>
  .ant-btn{
    background-color: #8e54e9!important;
    color: #fff!important;
    float: right;
    border-color: #8e54e9!important;
    height: 45px;
    width: 120px;
  }
</style>
