<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Session_level_list').feedbacks"
        :vobject="$v"
        nested="session_level_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sessions<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sessions"
              name="session_id"
              ref="select_session"
              :successFeed="false"
              :defaultValue="session_level_list.session_id"
              v-model="session_level_list.session_id"
              :url="mb.statics('Sessions').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatesession">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatesession = false"
          v-if="showModalCreatesession"
          class="modal-form"
          :title="'Añadir sessions'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <sessions_form :model="null" @close_modal="sessionAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Levels<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Levels"
              name="level_id"
              ref="select_level"
              :successFeed="false"
              :defaultValue="session_level_list.level_id"
              v-model="session_level_list.level_id"
              :url="mb.statics('Levels').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatelevel">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatelevel = false"
          v-if="showModalCreatelevel"
          class="modal-form"
          :title="'Añadir levels'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <levels_form :model="null" @close_modal="levelAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!session_level_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Session_level_list from "../../../../../entities/models/modules/managment/session_level_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Sessions_form from '../../../entities/sessions/form/sessions_form';
  import Levels_form from '../../../types/levels/form/levels_form';

export default {
  name: "session_level_list_form",
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
  validations: mb.statics('Session_level_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      session_level_list: mb.instance( 'Session_level_list'),
      showModalCreatesession: false,
      sessions_list: [],
      showModalCreatelevel: false,
      levels_list: [],
    };
  },
  computed: {
    session_level_listFeedbacks() {
      return mb.statics('Session_level_list').feedbacks;
    },
    button_text() {
      return this.session_level_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.session_level_list = mb.instance( 'Session_level_list',this.model);

  },
  components: {

       Sessions_form,
       Levels_form,
             },
  methods: {
      openModalCreatesession() {
        this.showModalCreatesession = true;
      },
      sessionAdded(refresh) {
        this.showModalCreatesession = false;
        refresh?this.refreshsession():'';
      },
      async refreshsession() {
        this.loading = true;
        await this.$refs.select_session.load();
        this.loading = false;
      },
      openModalCreatelevel() {
        this.showModalCreatelevel = true;
      },
      levelAdded(refresh) {
        this.showModalCreatelevel = false;
        refresh?this.refreshlevel():'';
      },
      async refreshlevel() {
        this.loading = true;
        await this.$refs.select_level.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'session_level_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.session_level_list.get_id() ? "actualizado" : "añadido";
        this.session_level_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'session_level_list_list'}):this.session_level_list=mb.instance('Session_level_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "session_level_list_form.css";
</style>

