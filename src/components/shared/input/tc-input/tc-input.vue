<template>
  <div v-if="name" class="w-100 position-relative">
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
        <a-input
          @mouseenter="hover = true"
          @mouseleave="hover = false"
          @input="handleChange"
          @blur="blurInput"
          @keypress="keypress"
          :type="type"
          :placeholder="placeholder"
          :title="title"
          :value="value"
          :size="size"
          :disabled="disabled"
          :maxLength="maxLength"
          ref="input"
        >
          <a-icon class="mr-1" v-if="icon" slot="prefix" :type="icon" />
        </a-input>
      </popover-validation>
    </a-form-item>

    <span
      :style="size=='large'? {bottom:'-4px'}:{}"
      :class="{'text-danger':invalidLength}"
      v-if="vueobject && object.$params && object.$params['maxLength']"
      class="limit-length"
    >{{value.length}}/{{object.$params["maxLength"]["max"]}}</span>
  </div>

  <a-form-item v-else>
    <a-input
      @input="handleChange"
      :type="type"
      :placeholder="placeholder"
      :title="title"
      :value="value"
      :size="size"
      :disabled="disabled"
      ref="input"
    />
  </a-form-item>
</template>

<script>
import { TcInputMixing } from "./tc-inputs-mixing";
export default {
  props: {
    // Input html type
    type: {
      type: String,
      default: "text"
    },
    maxLength: Number
  },
  mixins: [TcInputMixing],
  computed: {
    invalidLength() {
      let invalid = this.object["maxLength"] === false;
      if (invalid) {
        this.object.$touch();
      }
      return invalid;
    }
  },
  methods: {
    keypress(e) {
      if (this.object.integer) {
        if (e.keyCode < 48 || e.keyCode > 57) {
          e.preventDefault();
        }
      }
      this.$emit("keypress", e);
    }
  }
};
import "./tc-input.scss";
</script>
