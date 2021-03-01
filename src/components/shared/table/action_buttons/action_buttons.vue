<template>
  <div class="icons-list" style="margin-left: 10px">
    <a-tooltip placement="top" v-if="visible_edit" @click="v_instance.onEditing(object)"
               title="Actualizar elemento">
      <i class=" ti ti-pencil-alt" style="padding-right: 5px;color: #1fb473;font-size: 20px;" />
    </a-tooltip>
    <a-tooltip placement="top" v-if="visible_view" @click="v_instance.onView(object)"
               title="Ver elemento">
      <i class=" ti ti-eye" style="padding-right: 5px;color: #e48e26;font-size: 20px;" />

    </a-tooltip>
    <a-tooltip placement="top" v-if="visible_delete" title="Eliminar elemento">
      <i type="delete" style="padding-right: 5px;color: red;font-size: 20px;" @click="showDeleteConfirm" class="ti ti-trash"/>
    </a-tooltip>
    <slot></slot>
  </div>
</template>
<script>
  import * as utils from '../../../../entities/utils/utils';
  import * as model_factory from "../../../../entities/models";


  export default {
    name: "action_buttons",
    props: {
      object: Object,
      v_instance: Object,
      class_name: {
        type: String,
        default: "BaseModel"
      },
      visible_edit: {
        type: Boolean,
        default: true
      },
      visible_delete: {
        type: Boolean,
        default: true
      },
      visible_view: {
        type: Boolean,
        default: true
      },
      visible_custom_button: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        model: {}
      }
    },
    methods: {
      showDeleteConfirm() {
        let _this = this;
        this.$confirm({
          title: 'Desea eliminar este elemento?',
          icon: "delete",
          // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
          okText: 'Si',
          okType: 'danger',
          class: 'delete_confirm',
          cancelText: 'No',
          async onOk() {
            try {
              const response = await _this.model.delete();
              utils.process_response(response, 'delete')
              _this.v_instance.load_data();
            } catch (error) {
              utils.process_error(error)
            }
          },
          onCancel() {

          },
        });
      },
    },
    mounted() {
      this.model = model_factory.instance(this.class_name)
      this.model.set_attributes(this.object)
    }
  }
</script>

<style scoped>
  /*.delete_confirm*/

</style>

