<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Role_permission_list').feedbacks"
        :vobject="$v"
        nested="role_permission_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Roles<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Roles"
              name="role_id"
              ref="select_role"
              :successFeed="false"
              :defaultValue="role_permission_list.role_id"
              v-model="role_permission_list.role_id"
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Permissions<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Permissions"
              name="permission_id"
              ref="select_permission"
              :successFeed="false"
              :defaultValue="role_permission_list.permission_id"
              v-model="role_permission_list.permission_id"
              :url="mb.statics('Permissions').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatepermission">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatepermission = false"
          v-if="showModalCreatepermission"
          class="modal-form"
          :title="'Añadir permissions'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <permissions_form :model="null" @close_modal="permissionAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!role_permission_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Role_permission_list from "../../../../../entities/models/modules/security/role_permission_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Roles_form from '../../roles/form/roles_form';
  import Permissions_form from '../../permissions/form/permissions_form';

export default {
  name: "role_permission_list_form",
  inject: {
      close_modal: { default: ()=>{} },
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
      default: "bottomLeft"
    }
  },
  validations: mb.statics('Role_permission_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      role_permission_list: mb.instance( 'Role_permission_list'),
      showModalCreaterole: false,
      roles_list: [],
      showModalCreatepermission: false,
      permissions_list: [],
    };
  },
  computed: {
    role_permission_listFeedbacks() {
      return mb.statics('Role_permission_list').feedbacks;
    },
    button_text() {
      return this.role_permission_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.role_permission_list = mb.instance( 'Role_permission_list',this.model);

  },
  components: {

       Roles_form,
       Permissions_form,
             },
  methods: {
      openModalCreaterole() {
        this.showModalCreaterole = true;
      },
      roleAdded(refresh) {
        this.showModalCreaterole = false;
        refresh?this.refreshrole():'';
      },
      async refreshrole() {
        this.loading = true;
        await this.$refs.select_role.load();
        this.loading = false;
      },
      openModalCreatepermission() {
        this.showModalCreatepermission = true;
      },
      permissionAdded(refresh) {
        this.showModalCreatepermission = false;
        refresh?this.refreshpermission():'';
      },
      async refreshpermission() {
        this.loading = true;
        await this.$refs.select_permission.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'role_permission_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.role_permission_list.get_id() ? "actualizado" : "añadido";
        this.role_permission_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'role_permission_list_list'}):this.role_permission_list=mb.instance('Role_permission_list');this.load_data();this.$refs.form.vobject.$reset()
            }
            this.loading = false;
          })
          .catch((error) => {
            this.loading = false;
            utils.process_error(error);
          });
      }
    }
  }
};
</script>

<style scoped>
@import "role_permission_list_form.css";
</style>

