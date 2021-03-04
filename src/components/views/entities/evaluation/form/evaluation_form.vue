<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Evaluation').feedbacks"
        :vobject="$v"
        nested="evaluation"
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
              :defaultValue="evaluation.test_id"
              v-model="evaluation.test_id"
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
              :defaultValue="evaluation.level_id"
              v-model="evaluation.level_id"
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
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sessions<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sessions"
              name="session_id"
              ref="select_session"
              :successFeed="false"
              :defaultValue="evaluation.session_id"
              v-model="evaluation.session_id"
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
          <label>Students<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Students"
              name="student_id"
              ref="select_student"
              :successFeed="false"
              :defaultValue="evaluation.student_id"
              v-model="evaluation.student_id"
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
          <label>Teachers<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Teachers"
              name="teacher_id"
              ref="select_teacher"
              :successFeed="false"
              :defaultValue="evaluation.teacher_id"
              v-model="evaluation.teacher_id"
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
        <label>Score<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor'   type_car='num'  name='score' v-model="evaluation.score"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!evaluation.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Evaluation from '../../../../../entities/models/modules/entities/evaluation.model'
import * as utils from '../../../../../entities/utils/utils'
import * as mb from '../../../../../entities/models'
import Teachers_form from '../../../entities/teachers/form/teachers_form'
import Tests_form from '../../../management/tests/form/tests_form'
import Levels_form from '../../../types/levels/form/levels_form'
import Sessions_form from '../../../entities/sessions/form/sessions_form'
import Students_form from '../../../entities/students/form/students_form'

export default {
  name: 'evaluation_form',
  inject: {
    close_modal: { default: () => {} },
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
      default: 'bottomLeft'
    }
  },
  validations: mb.statics('Evaluation').validations,
  data () {
    return {
      loading: false,
      mb, // This property is for load static or instance class
      evaluation: mb.instance('Evaluation'),
      showModalCreateteacher: false,
      teachers_list: [],
      showModalCreatetest: false,
      tests_list: [],
      showModalCreatelevel: false,
      levels_list: [],
      showModalCreatesession: false,
      sessions_list: [],
      showModalCreatestudent: false,
      students_list: []
    }
  },
  computed: {
    evaluationFeedbacks () {
      return mb.statics('Evaluation').feedbacks
    },
    button_text () {
      return this.evaluation.get_id() ? 'Actualizar' : 'Añadir'
    }
  },

  mounted: function () {
    this.evaluation = mb.instance('Evaluation', this.model)
  },
  components: {

    Teachers_form,
    Tests_form,
    Levels_form,
    Sessions_form,
    Students_form
  },
  methods: {
    openModalCreateteacher () {
      this.showModalCreateteacher = true
    },
    teacherAdded (refresh) {
      this.showModalCreateteacher = false
      refresh ? this.refreshteacher() : ''
    },
    async refreshteacher () {
      this.loading = true
      await this.$refs.select_teacher.load()
      this.loading = false
    },
    openModalCreatetest () {
      this.showModalCreatetest = true
    },
    testAdded (refresh) {
      this.showModalCreatetest = false
      refresh ? this.refreshtest() : ''
    },
    async refreshtest () {
      this.loading = true
      await this.$refs.select_test.load()
      this.loading = false
    },
    openModalCreatelevel () {
      this.showModalCreatelevel = true
    },
    levelAdded (refresh) {
      this.showModalCreatelevel = false
      refresh ? this.refreshlevel() : ''
    },
    async refreshlevel () {
      this.loading = true
      await this.$refs.select_level.load()
      this.loading = false
    },
    openModalCreatesession () {
      this.showModalCreatesession = true
    },
    sessionAdded (refresh) {
      this.showModalCreatesession = false
      refresh ? this.refreshsession() : ''
    },
    async refreshsession () {
      this.loading = true
      await this.$refs.select_session.load()
      this.loading = false
    },
    openModalCreatestudent () {
      this.showModalCreatestudent = true
    },
    studentAdded (refresh) {
      this.showModalCreatestudent = false
      refresh ? this.refreshstudent() : ''
    },
    async refreshstudent () {
      this.loading = true
      await this.$refs.select_student.load()
      this.loading = false
    },
    cancel () {
      if (!this.model) {
        this.$emit('close_modal', false)
      } else {
        this.modal ? this.close_modal(null, false) : this.$router.push({name: 'evaluation_list'})
      }
    },
    save_model (and_new = false) {
      if (this.$refs.form.validate()) {
        this.loading = true
        const accion = this.evaluation.get_id() ? 'actualizado' : 'añadido'
        this.evaluation
          .save()
          .then((response) => {
            if (utils.process_response(response, accion)) {
              if (!this.model && !and_new && this.modal) {
                this.$emit('close_modal', true)
                return
              } else { !and_new ? this.modal ? this.close_modal(null, true) : this.$router.push({name: 'evaluation_list'}) : this.evaluation = mb.instance('Evaluation') } this.load_data(); this.$refs.form.vobject.$reset()
            }
            this.loading = false
          })
          .catch((error) => {
            this.loading = false
            utils.process_error(error)
          })
      }
    }
  }
}
</script>

<style scoped>
@import "evaluation_form.css";
</style>
