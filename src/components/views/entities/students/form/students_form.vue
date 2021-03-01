<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Students').feedbacks"
        :vobject="$v"
        nested="students"
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
              :defaultValue="students.user_id"
              v-model="students.user_id"
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
        <label>Student_address1<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='student_address1' v-model="students.student_address1"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_address2</label>
        <tc-input placeholder='Ingrese el valor' name='student_address2' v-model="students.student_address2"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_city</label>
        <tc-input placeholder='Ingrese el valor' name='student_city' v-model="students.student_city"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_state</label>
        <tc-input placeholder='Ingrese el valor' name='student_state' v-model="students.student_state"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_zip_code</label>
        <tc-input placeholder='Ingrese el valor'   type_car='num'  name='student_zip_code' v-model="students.student_zip_code"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Student_dob</label>
          <div class="d-flex flex-row">
            <tc-date-picker name="student_dob" v-model="students.student_dob"></tc-date-picker>
          </div>
        </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_picture</label>
        <tc-input placeholder='Ingrese el valor' name='student_picture' v-model="students.student_picture"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Student_legal_age</label>
          <div>
            <a-switch  v-model="students.student_legal_age"/>
          </div>
        </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_tutor_first_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='student_tutor_first_name' v-model="students.student_tutor_first_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Student_tutor_last_name</label>
        <tc-input placeholder='Ingrese el valor' name='student_tutor_last_name' v-model="students.student_tutor_last_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Studen_tutor_email</label>
        <tc-input placeholder='Ingrese el valor' name='studen_tutor_email' v-model="students.studen_tutor_email"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Schools<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Schools"
              name="school_id"
              ref="select_school"
              :successFeed="false"
              :defaultValue="students.school_id"
              v-model="students.school_id"
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
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!students.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Students from "../../../../../entities/models/modules/entities/students.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Schools_form from '../../schools/form/schools_form';
  import Users_form from '../../../security/users/form/users_form';

export default {
  name: "students_form",
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
  validations: mb.statics('Students').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      students: mb.instance( 'Students'),
      showModalCreateschool: false,
      schools_list: [],
      showModalCreateuser: false,
      users_list: [],
    };
  },
  computed: {
    studentsFeedbacks() {
      return mb.statics('Students').feedbacks;
    },
    button_text() {
      return this.students.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.students = mb.instance( 'Students',this.model);

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
        this.modal?this.close_modal(null,false):this.$router.push({name: 'students_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.students.get_id() ? "actualizado" : "añadido";
        this.students
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'students_list'}):this.students=mb.instance('Students');this.load_data();this.$refs.form.vobject.$reset()
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
@import "students_form.css";
</style>

