<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Test_level_list').feedbacks"
        :vobject="$v"
        nested="test_level_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Tests<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Tests"
              name="test_id"
              ref="select_test"
              :successFeed="false"
              :defaultValue="test_level_list.test_id"
              v-model="test_level_list.test_id"
              :url="mb.statics('Tests').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatetest">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatetest = false"
          v-if="showModalCreatetest"
          class="modal-form"
          :title="'Añadir tests'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <tests_form :model="null" @close_modal="testAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Levels<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Levels"
              name="level_id"
              ref="select_level"
              :successFeed="false"
              :defaultValue="test_level_list.level_id"
              v-model="test_level_list.level_id"
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
      <button v-if="!test_level_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Test_level_list from "../../../../../entities/models/modules/managment/test_level_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Levels_form from '../../../types/levels/form/levels_form';
  import Tests_form from '../../tests/form/tests_form';

export default {
  name: "test_level_list_form",
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
  validations: mb.statics('Test_level_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      test_level_list: mb.instance( 'Test_level_list'),
      showModalCreatelevel: false,
      levels_list: [],
      showModalCreatetest: false,
      tests_list: [],
    };
  },
  computed: {
    test_level_listFeedbacks() {
      return mb.statics('Test_level_list').feedbacks;
    },
    button_text() {
      return this.test_level_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.test_level_list = mb.instance( 'Test_level_list',this.model);

  },
  components: {

       Levels_form,
       Tests_form,
             },
  methods: {
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
      openModalCreatetest() {
        this.showModalCreatetest = true;
      },
      testAdded(refresh) {
        this.showModalCreatetest = false;
        refresh?this.refreshtest():'';
      },
      async refreshtest() {
        this.loading = true;
        await this.$refs.select_test.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'test_level_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.test_level_list.get_id() ? "actualizado" : "añadido";
        this.test_level_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'test_level_list_list'}):this.test_level_list=mb.instance('Test_level_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "test_level_list_form.css";
</style>

