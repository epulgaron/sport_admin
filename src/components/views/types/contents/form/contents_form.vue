<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Contents').feedbacks"
        :vobject="$v"
        nested="contents"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Content_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='content_name' v-model="contents.content_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group p-0 col-12">
        <label>Content_description</label>
        <tc-input :text_area="true" size="large" name="content_description" v-model="contents.content_description"/>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="contents.sport_id"
              v-model="contents.sport_id"
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sessions<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sessions"
              name="session_id"
              ref="select_session"
              :successFeed="false"
              :defaultValue="contents.session_id"
              v-model="contents.session_id"
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
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!contents.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Contents from "../../../../../entities/models/modules/types/contents.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Sports_form from '../../sports/form/sports_form';
  import Sessions_form from '../../../entities/sessions/form/sessions_form';

export default {
  name: "contents_form",
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
  validations: mb.statics('Contents').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      contents: mb.instance( 'Contents'),
      showModalCreatesport: false,
      sports_list: [],
      showModalCreatesession: false,
      sessions_list: [],
    };
  },
  computed: {
    contentsFeedbacks() {
      return mb.statics('Contents').feedbacks;
    },
    button_text() {
      return this.contents.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.contents = mb.instance( 'Contents',this.model);

  },
  components: {

       Sports_form,
       Sessions_form,
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
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'contents_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.contents.get_id() ? "actualizado" : "añadido";
        this.contents
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'contents_list'}):this.contents=mb.instance('Contents');this.load_data();this.$refs.form.vobject.$reset()
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
@import "contents_form.css";
</style>

