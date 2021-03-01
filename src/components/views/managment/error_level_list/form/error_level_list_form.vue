<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Error_level_list').feedbacks"
        :vobject="$v"
        nested="error_level_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Errors<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Errors"
              name="error_id"
              ref="select_error"
              :successFeed="false"
              :defaultValue="error_level_list.error_id"
              v-model="error_level_list.error_id"
              :url="mb.statics('Errors').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateerror">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateerror = false"
          v-if="showModalCreateerror"
          class="modal-form"
          :title="'Añadir errors'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <errors_form :model="null" @close_modal="errorAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Error_level<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Error_level"
              name="error_level_id"
              ref="select_error_level"
              :successFeed="false"
              :defaultValue="error_level_list.error_level_id"
              v-model="error_level_list.error_level_id"
              :url="mb.statics('Error_level').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateerror_level">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateerror_level = false"
          v-if="showModalCreateerror_level"
          class="modal-form"
          :title="'Añadir error_level'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <error_level_form :model="null" @close_modal="error_levelAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Evaluation<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Evaluation"
              name="eval_id"
              ref="select_eval"
              :successFeed="false"
              :defaultValue="error_level_list.eval_id"
              v-model="error_level_list.eval_id"
              :url="mb.statics('Evaluation').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateeval">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateeval = false"
          v-if="showModalCreateeval"
          class="modal-form"
          :title="'Añadir evaluation'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <evaluation_form :model="null" @close_modal="evalAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!error_level_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Error_level_list from "../../../../../entities/models/modules/managment/error_level_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Evaluation_form from '../../evaluation/form/evaluation_form';
  import Errors_form from '../../../entities/errors/form/errors_form';
  import Error_level_form from '../../../types/error_level/form/error_level_form';

export default {
  name: "error_level_list_form",
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
  validations: mb.statics('Error_level_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      error_level_list: mb.instance( 'Error_level_list'),
      showModalCreateeval: false,
      evaluation_list: [],
      showModalCreateerror: false,
      errors_list: [],
      showModalCreateerror_level: false,
      error_level_list: [],
    };
  },
  computed: {
    error_level_listFeedbacks() {
      return mb.statics('Error_level_list').feedbacks;
    },
    button_text() {
      return this.error_level_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.error_level_list = mb.instance( 'Error_level_list',this.model);

  },
  components: {

       Evaluation_form,
       Errors_form,
       Error_level_form,
             },
  methods: {
      openModalCreateeval() {
        this.showModalCreateeval = true;
      },
      evalAdded(refresh) {
        this.showModalCreateeval = false;
        refresh?this.refresheval():'';
      },
      async refresheval() {
        this.loading = true;
        await this.$refs.select_eval.load();
        this.loading = false;
      },
      openModalCreateerror() {
        this.showModalCreateerror = true;
      },
      errorAdded(refresh) {
        this.showModalCreateerror = false;
        refresh?this.refresherror():'';
      },
      async refresherror() {
        this.loading = true;
        await this.$refs.select_error.load();
        this.loading = false;
      },
      openModalCreateerror_level() {
        this.showModalCreateerror_level = true;
      },
      error_levelAdded(refresh) {
        this.showModalCreateerror_level = false;
        refresh?this.refresherror_level():'';
      },
      async refresherror_level() {
        this.loading = true;
        await this.$refs.select_error_level.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'error_level_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.error_level_list.get_id() ? "actualizado" : "añadido";
        this.error_level_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'error_level_list_list'}):this.error_level_list=mb.instance('Error_level_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "error_level_list_form.css";
</style>

