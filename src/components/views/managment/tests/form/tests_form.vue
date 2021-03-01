<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Tests').feedbacks"
        :vobject="$v"
        nested="tests"
        ref="form"
        class="form-row"
      >
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>Test_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor'   type_car='num'  name='test_name' v-model="tests.test_name"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Test_date<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-date-picker name="test_date" v-model="tests.test_date"></tc-date-picker>
          </div>
        </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Flows<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Flows"
              name="flow_id"
              ref="select_flow"
              :successFeed="false"
              :defaultValue="tests.flow_id"
              v-model="tests.flow_id"
              :url="mb.statics('Flows').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreateflow">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreateflow = false"
          v-if="showModalCreateflow"
          class="modal-form"
          :title="'Añadir flows'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <flows_form :model="null" @close_modal="flowAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Sports<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Sports"
              name="sport_id"
              ref="select_sport"
              :successFeed="false"
              :defaultValue="tests.sport_id"
              v-model="tests.sport_id"
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
          <label>Types<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Types"
              name="type_id"
              ref="select_type"
              :successFeed="false"
              :defaultValue="tests.type_id"
              v-model="tests.type_id"
              :url="mb.statics('Types').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatetype">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatetype = false"
          v-if="showModalCreatetype"
          class="modal-form"
          :title="'Añadir types'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <types_form :model="null" @close_modal="typeAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Schools<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Schools"
              name="school_id"
              ref="select_school"
              :successFeed="false"
              :defaultValue="tests.school_id"
              v-model="tests.school_id"
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
          <label>Status<span class='required_field'>*</span></label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Status"
              name="status_id"
              ref="select_status"
              :successFeed="false"
              :defaultValue="tests.status_id"
              v-model="tests.status_id"
              :url="mb.statics('Status').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatestatus">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatestatus = false"
          v-if="showModalCreatestatus"
          class="modal-form"
          :title="'Añadir status'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <status_form :model="null" @close_modal="statusAdded"/>
        </a-modal>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Final_date</label>
          <div class="d-flex flex-row">
            <tc-date-picker name="final_date" v-model="tests.final_date"></tc-date-picker>
          </div>
        </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!tests.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Tests from "../../../../../entities/models/modules/managment/tests.model";
import * as utils from "../../../../../entities/utils/utils";
import * as mb from "../../../../../entities/models"
  import Status_form from '../../../types/status/form/status_form';
  import Flows_form from '../../../types/flows/form/flows_form';
  import Schools_form from '../../../entities/schools/form/schools_form';
  import Sports_form from '../../../types/sports/form/sports_form';
  import Types_form from '../../../types/types/form/types_form';

export default {
  name: "tests_form",
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
  validations: mb.statics('Tests').validations,
  data() {
    return {
      loading: false,
      mb,      // This property is for load static or instance class
      tests: mb.instance( 'Tests'),
      showModalCreatestatus: false,
      status_list: [],
      showModalCreateflow: false,
      flows_list: [],
      showModalCreateschool: false,
      schools_list: [],
      showModalCreatesport: false,
      sports_list: [],
      showModalCreatetype: false,
      types_list: [],
    };
  },
  computed: {
    testsFeedbacks() {
      return mb.statics('Tests').feedbacks;
    },
    button_text() {
      return this.tests.get_id() ? "Actualizar" : "Añadir";
    },
  },

  mounted: function() {
    this.tests = mb.instance( 'Tests',this.model);

  },
  components: {

       Status_form,
       Flows_form,
       Schools_form,
       Sports_form,
       Types_form,
             },
  methods: {
      openModalCreatestatus() {
        this.showModalCreatestatus = true;
      },
      statusAdded(refresh) {
        this.showModalCreatestatus = false;
        refresh?this.refreshstatus():'';
      },
      async refreshstatus() {
        this.loading = true;
        await this.$refs.select_status.load();
        this.loading = false;
      },
      openModalCreateflow() {
        this.showModalCreateflow = true;
      },
      flowAdded(refresh) {
        this.showModalCreateflow = false;
        refresh?this.refreshflow():'';
      },
      async refreshflow() {
        this.loading = true;
        await this.$refs.select_flow.load();
        this.loading = false;
      },
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
      openModalCreatetype() {
        this.showModalCreatetype = true;
      },
      typeAdded(refresh) {
        this.showModalCreatetype = false;
        refresh?this.refreshtype():'';
      },
      async refreshtype() {
        this.loading = true;
        await this.$refs.select_type.load();
        this.loading = false;
      },
      cancel(){
        if (!this.model) {
          this.$emit('close_modal',false)
        } else {
        this.modal?this.close_modal(null,false):this.$router.push({name: 'tests_list'})
       }
      },
    save_model(and_new=false) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const accion=this.tests.get_id() ? "actualizado" : "añadido";
        this.tests
          .save()
          .then((response) => {
            if(utils.process_response(response,accion)) {
              if (!this.model && !and_new && this.modal) {

                  this.$emit('close_modal',true)
                  return;
               }
                else
                   !and_new?this.modal?this.close_modal(null,true):this.$router.push({name: 'tests_list'}):this.tests=mb.instance('Tests');this.load_data();this.$refs.form.vobject.$reset()
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
@import "tests_form.css";
</style>

