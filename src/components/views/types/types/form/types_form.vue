<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Types').feedbacks"
        :vobject="$v"
        nested="types"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Type_acr</label>
        <tc-input placeholder='Ingrese el valor' name='type_acr' v-model="types.type_acr"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Type_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='type_name' v-model="types.type_name"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!types.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Types from "../../../../../entities/models/modules/types/types.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"

export default {
  name: "types_form",
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
  validations: mb.statics('Types').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      types: mb.instance( 'Types'),
    };
  },
  computed: {
    typesFeedbacks() {
      return mb.statics('Types').feedbacks;
    },
    button_text() {
      return this.types.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.types = mb.instance( 'Types',this.model);

  },
  components: {

             },
  methods: {
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'types_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.types.get_id() ? "actualizado" : "añadido";
        this.types
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'types_list'}):this.types=mb.instance('Types');this.load_data();this.$refs.form.vobject.$reset()
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
@import "types_form.css";
</style>

