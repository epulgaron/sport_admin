<template>
  <div v-if="vueobject" class="w-100 position-relative">
    <a-form-item
      ref="formItem"
      :has-feedback="true"
      :validate-status="object.$error?'error':!object.$invalid && successFeed?'success':''"
    >
      <popover-validation
        :container="self_container"
        :placement="popoverPlacement"
        :text="getText"
        :show="object.$error && hover"
      >
        <div @mouseenter="hover = true" @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-date-picker
            class="w-100"
            :disabled="disabled"
            :showTime="{ format: 'HH:mm' }"
            :size="size"
            :format="dateFormat"
            :disabled-date= "disabledDate"
            :value="value "
            :defaultPickerValue="defaultDateValue"
            @select="onChange"
            @change="onChange"
          />
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
import moment from "moment";
import { TcInputMixing } from "../tc-input/tc-inputs-mixing";
export default {
  props: {
    disabledDate:{
      type:Function
    },
    defaultValue: {
      type: String,
      default: () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const fullYear = date.getFullYear();
        return `${day}/${month}/${fullYear}`;
      }
    },
    value: {
        type:Object,
        default: ()=> moment()
    }
  },
  mixins: [TcInputMixing],
  computed: {
    defaultDateValue() {
      return moment(this.defaultValue, this.dateFormat);
    },

  },
  methods: {
    onChange(date, dateString) {
      this.$emit("change", date);
    },
  },
  components: {},
  data() {
    return {
      moment,
      dateFormat: "DD/MM/YYYY"
    };
  }
};
</script>
