<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Content_level_list').feedbacks"
        :vobject="$v"
        nested="content_level_list"
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
              :defaultValue="content_level_list.content_id"
              v-model="content_level_list.content_id"
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
          <label>Levels<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Levels"
              name="level_id"
              ref="select_level"
              :successFeed="false"
              :defaultValue="content_level_list.level_id"
              v-model="content_level_list.level_id"
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
      <button v-if="!content_level_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Content_level_list from "../../../../../entities/models/modules/managment/content_level_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Contents_form from '../../../types/contents/form/contents_form';
  import Levels_form from '../../../types/levels/form/levels_form';

export default {
  name: "content_level_list_form",
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
  validations: mb.statics('Content_level_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      content_level_list: mb.instance( 'Content_level_list'),
      showModalCreatecontent: false,
      contents_list: [],
      showModalCreatelevel: false,
      levels_list: [],
    };
  },
  computed: {
    content_level_listFeedbacks() {
      return mb.statics('Content_level_list').feedbacks;
    },
    button_text() {
      return this.content_level_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.content_level_list = mb.instance( 'Content_level_list',this.model);

  },
  components: {

       Contents_form,
       Levels_form,
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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'content_level_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.content_level_list.get_id() ? "actualizado" : "añadido";
        this.content_level_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'content_level_list_list'}):this.content_level_list=mb.instance('Content_level_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "content_level_list_form.css";
</style>

