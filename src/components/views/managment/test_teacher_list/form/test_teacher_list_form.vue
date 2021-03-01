<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Test_teacher_list').feedbacks"
        :vobject="$v"
        nested="test_teacher_list"
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
              :defaultValue="test_teacher_list.test_id"
              v-model="test_teacher_list.test_id"
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
          <label>Teachers<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Teachers"
              name="teacher_id"
              ref="select_teacher"
              :successFeed="false"
              :defaultValue="test_teacher_list.teacher_id"
              v-model="test_teacher_list.teacher_id"
              :url="mb.statics('Teachers').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateteacher">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateteacher = false"
          v-if="showModalCreateteacher"
          class="modal-form"
          :title="'Añadir teachers'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <teachers_form :model="null" @close_modal="teacherAdded"/>
        </a-modal>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!test_teacher_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Test_teacher_list from "../../../../../entities/models/modules/managment/test_teacher_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Tests_form from '../../tests/form/tests_form';
  import Teachers_form from '../../../entities/teachers/form/teachers_form';

export default {
  name: "test_teacher_list_form",
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
  validations: mb.statics('Test_teacher_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      test_teacher_list: mb.instance( 'Test_teacher_list'),
      showModalCreatetest: false,
      tests_list: [],
      showModalCreateteacher: false,
      teachers_list: [],
    };
  },
  computed: {
    test_teacher_listFeedbacks() {
      return mb.statics('Test_teacher_list').feedbacks;
    },
    button_text() {
      return this.test_teacher_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.test_teacher_list = mb.instance( 'Test_teacher_list',this.model);

  },
  components: {

       Tests_form,
       Teachers_form,
             },
  methods: {
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
      openModalCreateteacher() {
        this.showModalCreateteacher = true;
      },
      teacherAdded(refresh) {
        this.showModalCreateteacher = false;
        refresh?this.refreshteacher():'';
      },
      async refreshteacher() {
        this.loading = true;
        await this.$refs.select_teacher.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'test_teacher_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.test_teacher_list.get_id() ? "actualizado" : "añadido";
        this.test_teacher_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'test_teacher_list_list'}):this.test_teacher_list=mb.instance('Test_teacher_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "test_teacher_list_form.css";
</style>

