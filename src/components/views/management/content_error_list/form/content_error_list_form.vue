<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Content_error_list').feedbacks"
        :vobject="$v"
        nested="content_error_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Contents<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Contents"
              name="content_id"
              ref="select_content"
              :successFeed="false"
              :defaultValue="content_error_list.content_id"
              v-model="content_error_list.content_id"
              :url="mb.statics('Contents').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatecontent">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatecontent = false"
          v-if="showModalCreatecontent"
          class="modal-form"
          :title="'Añadir contents'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <contents_form :model="null" @close_modal="contentAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Errors<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Errors"
              name="error_id"
              ref="select_error"
              :successFeed="false"
              :defaultValue="content_error_list.error_id"
              v-model="content_error_list.error_id"
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
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!content_error_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Content_error_list from "../../../../../entities/models/modules/managment/content_error_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Contents_form from '../../../types/contents/form/contents_form';
  import Errors_form from '../../../entities/errors/form/errors_form';

export default {
  name: "content_error_list_form",
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
  validations: mb.statics('Content_error_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      content_error_list: mb.instance( 'Content_error_list'),
      showModalCreatecontent: false,
      contents_list: [],
      showModalCreateerror: false,
      errors_list: [],
    };
  },
  computed: {
    content_error_listFeedbacks() {
      return mb.statics('Content_error_list').feedbacks;
    },
    button_text() {
      return this.content_error_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.content_error_list = mb.instance( 'Content_error_list',this.model);

  },
  components: {

       Contents_form,
       Errors_form,
             },
  methods: {
      openModalCreatecontent() {
        this.showModalCreatecontent = true;
      },
      contentAdded(refresh) {
        this.showModalCreatecontent = false;
        refresh?this.refreshcontent():'';
      },
      async refreshcontent() {
        this.loading = true;
        await this.$refs.select_content.load();
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
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'content_error_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.content_error_list.get_id() ? "actualizado" : "añadido";
        this.content_error_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'content_error_list_list'}):this.content_error_list=mb.instance('Content_error_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "content_error_list_form.css";
</style>

