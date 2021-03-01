<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Status').feedbacks"
        :vobject="$v"
        nested="status"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Status_acr</label>
        <tc-input placeholder='Ingrese el valor' name='status_acr' v-model="status.status_acr"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Status_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='status_name' v-model="status.status_name"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!status.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Status from "../../../../../entities/models/modules/types/status.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"

export default {
  name: "status_form",
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
  validations: mb.statics('Status').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      status: mb.instance( 'Status'),
    };
  },
  computed: {
    statusFeedbacks() {
      return mb.statics('Status').feedbacks;
    },
    button_text() {
      return this.status.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.status = mb.instance( 'Status',this.model);

  },
  components: {

             },
  methods: {
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'status_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.status.get_id() ? "actualizado" : "añadido";
        this.status
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'status_list'}):this.status=mb.instance('Status');this.load_data();this.$refs.form.vobject.$reset()
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
@import "status_form.css";
</style>

