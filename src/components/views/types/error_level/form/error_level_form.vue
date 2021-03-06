<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Error_level').feedbacks"
        :vobject="$v"
        nested="error_level"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Error_level_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor'   name='error_level_name' v-model="error_level.error_level_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Error_level_eval<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor'   type_car='num'  name='error_level_eval' v-model="error_level.error_level_eval"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Schools<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Schools"
              name="school_id"
              ref="select_school"
              :successFeed="false"
              :defaultValue="error_level.school_id"
              v-model="error_level.school_id"
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="error_level.sport_id"
              v-model="error_level.sport_id"
              :url="mb.statics('Sports').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatesport">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatesport = false"
          v-if="showModalCreatesport"
          class="modal-form"
          :title="'Añadir sports'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <sports_form :model="null" @close_modal="sportAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!error_level.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Error_level from "../../../../../entities/models/modules/types/error_level.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Schools_form from '../../../entities/schools/form/schools_form';
  import Sports_form from '../../sports/form/sports_form';

export default {
  name: "error_level_form",
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
  validations: mb.statics('Error_level').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      error_level: mb.instance( 'Error_level'),
      showModalCreateschool: false,
      schools_list: [],
      showModalCreatesport: false,
      sports_list: [],
    };
  },
  computed: {
    error_levelFeedbacks() {
      return mb.statics('Error_level').feedbacks;
    },
    button_text() {
      return this.error_level.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.error_level = mb.instance( 'Error_level',this.model);

  },
  components: {

       Schools_form,
       Sports_form,
             },
  methods: {
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
      openModalCreatesport() {
        this.showModalCreatesport = true;
      },
      sportAdded(refresh) {
        this.showModalCreatesport = false;
        refresh?this.refreshsport():'';
      },
      async refreshsport() {
        this.loading = true;
        await this.$refs.select_sport.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'error_level_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.error_level.get_id() ? "actualizado" : "añadido";
        this.error_level
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'error_level_list'}):this.error_level=mb.instance('Error_level');this.load_data();this.$refs.form.vobject.$reset()
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
@import "error_level_form.css";
</style>

