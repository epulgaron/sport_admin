<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Users').feedbacks"
        :vobject="$v"
        nested="users"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>User_first_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='user_first_name' v-model="users.user_first_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>User_last_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='user_last_name' v-model="users.user_last_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>User_email<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='user_email' v-model="users.user_email"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>User_phone</label>
        <tc-input placeholder='Ingrese el valor' name='user_phone' v-model="users.user_phone"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>User_password</label>
        <tc-input placeholder='Ingrese el valor' name='user_password' v-model="users.user_password"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Roles<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Roles"
              name="role_id"
              ref="select_role"
              :successFeed="false"
              :defaultValue="users.role_id"
              v-model="users.role_id"
              :url="mb.statics('Roles').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreaterole">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreaterole = false"
          v-if="showModalCreaterole"
          class="modal-form"
          :title="'Añadir roles'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <roles_form :model="null" @close_modal="roleAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!users.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Users from '../../../../../entities/models/modules/security/users.model'
import * as utils from '../../../../../entities/utils/utils'
import * as mb from '../../../../../entities/models'
import Roles_form from '../../roles/form/roles_form'

export default {
  name: 'users_form',
  inject: {
    close_modal: { default: () => {} },
    load_data: {default: () => {} }
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    modal: {
      type: Boolean,
      default: false
    },
    popoverPlacement: {
      type: String,
      default: 'bottomLeft'
    }
  },
  validations: mb.statics('Users').validations,
  data () {
    return {
      loading: false,
      mb, // This property is for load static or instance class
      users: mb.instance('Users'),
      showModalCreaterole: false,
      roles_list: []
    }
  },
  computed: {
    usersFeedbacks () {
      return mb.statics('Users').feedbacks
    },
    button_text () {
      return this.users.get_id() ? 'Actualizar' : 'Añadir'
    }
  },

  mounted: function () {
    this.users = mb.instance('Users', this.model)
  },
  components: {

    Roles_form
  },
  methods: {
    openModalCreaterole () {
      this.showModalCreaterole = true
    },
    roleAdded (refresh) {
      this.showModalCreaterole = false
      refresh ? this.refreshrole() : ''
    },
    async refreshrole () {
      this.loading = true
      await this.$refs.select_role.load()
      this.loading = false
    },
    cancel () {
      if (!this.model) {
        this.$emit('close_modal', false)
      } else {
        this.modal ? this.close_modal(null, false) : this.$router.push({name: 'users_list'})
      }
    },
    save_model (and_new = false) {
      if (this.$refs.form.validate()) {
        this.loading = true
        const accion = this.users.get_id() ? 'actualizado' : 'añadido'
        this.users
          .save()
          .then((response) => {
            if (utils.process_response(response, accion)) {
              if (!this.model && !and_new && this.modal) {
                this.$emit('close_modal', true)
                return
              } else { !and_new ? this.modal ? this.close_modal(null, true) : this.$router.push({name: 'users_list'}) : this.users = mb.instance('Users') } this.load_data(); this.$refs.form.vobject.$reset()
            }
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            utils.process_error(error)
          })
      }
    }
  }
}
</script>

<style scoped>
@import "users_form.css";
</style>
