<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Levels').feedbacks"
        :vobject="$v"
        nested="levels"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Level_acr</label>
        <tc-input placeholder='Ingrese el valor' name='level_acr' v-model="levels.level_acr"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Level_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='level_name' v-model="levels.level_name"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="levels.sport_id"
              v-model="levels.sport_id"
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
      <button v-if="!levels.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Levels from "../../../../../entities/models/modules/types/levels.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Sports_form from '../../sports/form/sports_form';

export default {
  name: "levels_form",
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
  validations: mb.statics('Levels').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      levels: mb.instance( 'Levels'),
      showModalCreatesport: false,
      sports_list: [],
    };
  },
  computed: {
    levelsFeedbacks() {
      return mb.statics('Levels').feedbacks;
    },
    button_text() {
      return this.levels.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.levels = mb.instance( 'Levels',this.model);

  },
  components: {

       Sports_form,
             },
  methods: {
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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'levels_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.levels.get_id() ? "actualizado" : "añadido";
        this.levels
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'levels_list'}):this.levels=mb.instance('Levels');this.load_data();this.$refs.form.vobject.$reset()
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
@import "levels_form.css";
</style>

