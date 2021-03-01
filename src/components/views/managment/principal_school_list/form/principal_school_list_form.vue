<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Principal_school_list').feedbacks"
        :vobject="$v"
        nested="principal_school_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Principals<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Principals"
              name="principal_id"
              ref="select_principal"
              :successFeed="false"
              :defaultValue="principal_school_list.principal_id"
              v-model="principal_school_list.principal_id"
              :url="mb.statics('Principals').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateprincipal">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateprincipal = false"
          v-if="showModalCreateprincipal"
          class="modal-form"
          :title="'Añadir principals'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <principals_form :model="null" @close_modal="principalAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Schools<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Schools"
              name="school_id"
              ref="select_school"
              :successFeed="false"
              :defaultValue="principal_school_list.school_id"
              v-model="principal_school_list.school_id"
              :url="mb.statics('Schools').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateschool">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateschool = false"
          v-if="showModalCreateschool"
          class="modal-form"
          :title="'Añadir schools'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <schools_form :model="null" @close_modal="schoolAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!principal_school_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Principal_school_list from "../../../../../entities/models/modules/managment/principal_school_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Principals_form from '../../../entities/principals/form/principals_form';
  import Schools_form from '../../../entities/schools/form/schools_form';

export default {
  name: "principal_school_list_form",
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
  validations: mb.statics('Principal_school_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      principal_school_list: mb.instance( 'Principal_school_list'),
      showModalCreateprincipal: false,
      principals_list: [],
      showModalCreateschool: false,
      schools_list: [],
    };
  },
  computed: {
    principal_school_listFeedbacks() {
      return mb.statics('Principal_school_list').feedbacks;
    },
    button_text() {
      return this.principal_school_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.principal_school_list = mb.instance( 'Principal_school_list',this.model);

  },
  components: {

       Principals_form,
       Schools_form,
             },
  methods: {
      openModalCreateprincipal() {
        this.showModalCreateprincipal = true;
      },
      principalAdded(refresh) {
        this.showModalCreateprincipal = false;
        refresh?this.refreshprincipal():'';
      },
      async refreshprincipal() {
        this.loading = true;
        await this.$refs.select_principal.load();
        this.loading = false;
      },
      openModalCreateschool() {
        this.showModalCreateschool = true;
      },
      schoolAdded(refresh) {
        this.showModalCreateschool = false;
        refresh?this.refreshschool():'';
      },
      async refreshschool() {
        this.loading = true;
        await this.$refs.select_school.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'principal_school_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.principal_school_list.get_id() ? "actualizado" : "añadido";
        this.principal_school_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'principal_school_list_list'}):this.principal_school_list=mb.instance('Principal_school_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "principal_school_list_form.css";
</style>

