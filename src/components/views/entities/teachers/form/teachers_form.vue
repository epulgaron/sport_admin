<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Teachers').feedbacks"
        :vobject="$v"
        nested="teachers"
        ref="form"
        class="form-row"
      >
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Users<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Users"
              name="user_id"
              ref="select_user"
              :successFeed="false"
              :defaultValue="teachers.user_id"
              v-model="teachers.user_id"
              :url="mb.statics('Users').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateuser">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateuser = false"
          v-if="showModalCreateuser"
          class="modal-form"
          :title="'Añadir users'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <users_form :model="null" @close_modal="userAdded"/>
        </a-modal>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Teacher_address</label>
        <tc-input placeholder='Ingrese el valor' name='teacher_address' v-model="teachers.teacher_address"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Schools<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Schools"
              name="school_id"
              ref="select_school"
              :successFeed="false"
              :defaultValue="teachers.school_id"
              v-model="teachers.school_id"
              :url="mb.statics('Schools').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateschool">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateschool = false"
          v-if="showModalCreateschool"
          class="modal-form"
          :title="'Añadir schools'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <schools_form :model="null" @close_modal="schoolAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>External</label>
          <div>
            <a-switch  v-model="teachers.external"/>
          </div>
        </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!teachers.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Teachers from "../../../../../entities/models/modules/entities/teachers.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Schools_form from '../../schools/form/schools_form';
  import Users_form from '../../../security/users/form/users_form';

export default {
  name: "teachers_form",
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
  validations: mb.statics('Teachers').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      teachers: mb.instance( 'Teachers'),
      showModalCreateschool: false,
      schools_list: [],
      showModalCreateuser: false,
      users_list: [],
    };
  },
  computed: {
    teachersFeedbacks() {
      return mb.statics('Teachers').feedbacks;
    },
    button_text() {
      return this.teachers.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.teachers = mb.instance( 'Teachers',this.model);

  },
  components: {

       Schools_form,
       Users_form,
             },
  methods: {
      openModalCreateschool() {
        this.showModalCreateschool = true;
      },
      schoolAdded(refresh) {
        this.showModalCreateschool = false;
        refresh?this.refreshschool():'';
      },
      async refreshschool() {
        this.loading = true;
        await this.$refs.select_school.load();
        this.loading = false;
      },
      openModalCreateuser() {
        this.showModalCreateuser = true;
      },
      userAdded(refresh) {
        this.showModalCreateuser = false;
        refresh?this.refreshuser():'';
      },
      async refreshuser() {
        this.loading = true;
        await this.$refs.select_user.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'teachers_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.teachers.get_id() ? "actualizado" : "añadido";
        this.teachers
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'teachers_list'}):this.teachers=mb.instance('Teachers');this.load_data();this.$refs.form.vobject.$reset()
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
@import "teachers_form.css";
</style>

