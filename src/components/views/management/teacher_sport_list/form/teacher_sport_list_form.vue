<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Teacher_sport_list').feedbacks"
        :vobject="$v"
        nested="teacher_sport_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Teachers<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Teachers"
              name="teacher_id"
              ref="select_teacher"
              :successFeed="false"
              :defaultValue="teacher_sport_list.teacher_id"
              v-model="teacher_sport_list.teacher_id"
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="teacher_sport_list.sport_id"
              v-model="teacher_sport_list.sport_id"
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
      <button v-if="!teacher_sport_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Teacher_sport_list from "../../../../../entities/models/modules/managment/teacher_sport_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Teachers_form from '../../../entities/teachers/form/teachers_form';
  import Sports_form from '../../../types/sports/form/sports_form';

export default {
  name: "teacher_sport_list_form",
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
  validations: mb.statics('Teacher_sport_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      teacher_sport_list: mb.instance( 'Teacher_sport_list'),
      showModalCreateteacher: false,
      teachers_list: [],
      showModalCreatesport: false,
      sports_list: [],
    };
  },
  computed: {
    teacher_sport_listFeedbacks() {
      return mb.statics('Teacher_sport_list').feedbacks;
    },
    button_text() {
      return this.teacher_sport_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.teacher_sport_list = mb.instance( 'Teacher_sport_list',this.model);

  },
  components: {

       Teachers_form,
       Sports_form,
             },
  methods: {
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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'teacher_sport_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.teacher_sport_list.get_id() ? "actualizado" : "añadido";
        this.teacher_sport_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'teacher_sport_list_list'}):this.teacher_sport_list=mb.instance('Teacher_sport_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "teacher_sport_list_form.css";
</style>

