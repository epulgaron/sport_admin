<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Sport_student_list').feedbacks"
        :vobject="$v"
        nested="sport_student_list"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Students<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Students"
              name="student_id"
              ref="select_student"
              :successFeed="false"
              :defaultValue="sport_student_list.student_id"
              v-model="sport_student_list.student_id"
              :url="mb.statics('Students').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatestudent">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatestudent = false"
          v-if="showModalCreatestudent"
          class="modal-form"
          :title="'Añadir students'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <students_form :model="null" @close_modal="studentAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="sport_student_list.sport_id"
              v-model="sport_student_list.sport_id"
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
          <label>Levels<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Levels"
              name="level_id"
              ref="select_level"
              :successFeed="false"
              :defaultValue="sport_student_list.level_id"
              v-model="sport_student_list.level_id"
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
      <button v-if="!sport_student_list.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Sport_student_list from "../../../../../entities/models/modules/managment/sport_student_list.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Students_form from '../../../entities/students/form/students_form';
  import Sports_form from '../../../types/sports/form/sports_form';
  import Levels_form from '../../../types/levels/form/levels_form';

export default {
  name: "sport_student_list_form",
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
  validations: mb.statics('Sport_student_list').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      sport_student_list: mb.instance( 'Sport_student_list'),
      showModalCreatestudent: false,
      students_list: [],
      showModalCreatesport: false,
      sports_list: [],
      showModalCreatelevel: false,
      levels_list: [],
    };
  },
  computed: {
    sport_student_listFeedbacks() {
      return mb.statics('Sport_student_list').feedbacks;
    },
    button_text() {
      return this.sport_student_list.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.sport_student_list = mb.instance( 'Sport_student_list',this.model);

  },
  components: {

       Students_form,
       Sports_form,
       Levels_form,
             },
  methods: {
      openModalCreatestudent() {
        this.showModalCreatestudent = true;
      },
      studentAdded(refresh) {
        this.showModalCreatestudent = false;
        refresh?this.refreshstudent():'';
      },
      async refreshstudent() {
        this.loading = true;
        await this.$refs.select_student.load();
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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'sport_student_list_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.sport_student_list.get_id() ? "actualizado" : "añadido";
        this.sport_student_list
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'sport_student_list_list'}):this.sport_student_list=mb.instance('Sport_student_list');this.load_data();this.$refs.form.vobject.$reset()
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
@import "sport_student_list_form.css";
</style>

