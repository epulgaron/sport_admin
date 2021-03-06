<template>
  <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
    <spinner v-if="loading" />
    <div class="card-body p-0" >

      <tc-form
        :feedbacks="mb.statics('Schools').feedbacks"
        :vobject="$v"
        nested="schools"
        ref="form"
        class="form-row"
      >
      <tc-form-item style="text-align: left" class="form-group mb-0 col-md-6 px-3">
        <label >Logo</label>
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          style="display: inline-table"
          :showUploadList="false"
          @change="handleImageChange"
        >
          <img id="school_logo" height="102px" width="102px" v-show="schools.school_logo" :src="mb.statics('Schools').getImageURL(schools.school_logo)" alt="Image"/>
          <div v-if="!schools.school_logo">
            <a-icon :type="loading ? 'loading' : 'plus'"/>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_name<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='school_name' v-model="schools.school_name"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_email<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='school_email' v-model="schools.school_email"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_phone</label>
        <tc-input placeholder='Ingrese el valor' name='school_phone' v-model="schools.school_phone"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_address1<span class='required_field'>*</span></label>
        <tc-input placeholder='Ingrese el valor' name='school_address1' v-model="schools.school_address1"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_address2</label>
        <tc-input placeholder='Ingrese el valor' name='school_address2' v-model="schools.school_address2"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_city</label>
        <tc-input placeholder='Ingrese el valor' name='school_city' v-model="schools.school_city"></tc-input>
      </tc-form-item>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_state</label>
        <tc-input placeholder='Ingrese el valor' name='school_state' v-model="schools.school_state"></tc-input>
      </tc-form-item>
        <tc-form-item class="form-group mb-0 col-md-6 px-3">
          <label>Countries</label>
          <div class="d-flex flex-row">
            <tc-autocomplete
              placeholder="Seleccione el Countries"
              name="country_id"
              ref="select_country"
              :successFeed="false"
              :defaultValue="schools.country_id"
              v-model="schools.country_id"
              :url="mb.statics('Countries').select_2_url"
            />
            <a-button type="dashed"
                      icon="plus"
                      class="dashed-primary rounded mt-1 ml-2"
                      @click="openModalCreatecountry">
            </a-button>
          </div>
        </tc-form-item>

        <a-modal
          @cancel="showModalCreatecountry = false"
          v-if="showModalCreatecountry"
          class="modal-form"
          :title="'Añadir countries'"
          :visible="true"
          :header="null"
          :footer="null"
          :maskClosable="false"
        >
          <countries_form :model="null" @close_modal="countryAdded"/>
        </a-modal>
      <tc-form-item class="form-group mb-0 col-md-6 px-3">
        <label>School_zip_code</label>
        <tc-input placeholder='Ingrese el valor'   type_car='num'  name='school_zip_code' v-model="schools.school_zip_code"></tc-input>
      </tc-form-item>
      </tc-form>
    </div>
    <div class="card-footer p-0">
      <button :disabled="loading" class="btn btn-primary" @click="save_model()">{{button_text}}</button>
      <button v-if="!schools.get_id()" :disabled="loading" class="btn btn-primary" @click="save_model(true)">Añadir y nuevo</button>
      <button :disabled="loading" class="btn btn-danger" @click="cancel()">Cancel</button>
    </div>
  </div>
</template>

<script>
import Schools from '../../../../../entities/models/modules/entities/schools.model'
import * as utils from '../../../../../entities/utils/utils'
import * as mb from '../../../../../entities/models'
import Countries_form from '../../../types/countries/form/countries_form'

export default {
  name: 'schools_form',
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
  validations: mb.statics('Schools').validations,
  data () {
    return {
      loading: false,
      mb, // This property is for load static or instance class
      schools: mb.instance('Schools'),
      showModalCreatecountry: false,
      countries_list: []
    }
  },
  computed: {
    schoolsFeedbacks () {
      return mb.statics('Schools').feedbacks
    },
    button_text () {
      return this.schools.get_id() ? 'Actualizar' : 'Añadir'
    }
  },

  mounted: function () {
    this.schools = mb.instance('Schools', this.model)
  },
  components: {

    Countries_form
  },
  methods: {
    handleImageChange (info) {
      let reader = new FileReader()
      reader.onload = function (e) {
        document.getElementById('school_logo').setAttribute('src', e.target.result)
      }
      reader.readAsDataURL(info.file)
      this.schools.school_logo = info.file
    },
    openModalCreatecountry () {
      this.showModalCreatecountry = true
    },
    countryAdded (refresh) {
      this.showModalCreatecountry = false
      refresh ? this.refreshcountry() : ''
    },
    async refreshcountry () {
      this.loading = true
      await this.$refs.select_country.load()
      this.loading = false
    },
    cancel () {
      if (!this.model) {
        this.$emit('close_modal', false)
      } else {
        this.modal ? this.close_modal(null, false) : this.$router.push({name: 'schools_list'})
      }
    },
    save_model (and_new = false) {
      if (this.$refs.form.validate()) {
        this.loading = true
        const accion = this.schools.get_id() ? 'actualizado' : 'añadido'
        this.schools
          .save()
          .then((response) => {
            if (utils.process_response(response, accion)) {
              if (!this.model && !and_new && this.modal) {
                this.$emit('close_modal', true)
                return
              } else { !and_new ? this.modal ? this.close_modal(null, true) : this.$router.push({name: 'schools_list'}) : this.schools = mb.instance('Schools') } this.load_data(); this.$refs.form.vobject.$reset()
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
@import "schools_form.css";
</style>
