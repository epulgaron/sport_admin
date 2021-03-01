<template>
  <div class="w-100 position-relative">
    <a-form-item
      ref="formItem"
      class="m-0 p-0"
      :has-feedback="true"
      :validate-status="validateStatus"
    >
      <popover-validation :placement="popoverPlacement" :text="getText" :show="showPopover">
        <div @mouseenter="hover = true" @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-tree-select
            @change="handleChange"
            :size="size"
            :showSearch="!loading&&!fetching"
            :disabled="disabled"
            :getPopupContainer="container"
            :value="value"
            :defaultValue="defaultValue"
            :filterTreeNode="filter"
            :dropdownStyle="{overflow: 'auto' }"
            :placeholder="placeholder"
            searchPlaceholder="Filtrar..."
            dropdownClassName="tc-autocomplete"
            allowClear
          >
            <a-tree-select-node
              v-if="loading||fetching"
              class="loading-autocomplete"
              :selectable="false"
            >
              <spinner size="small" slot="title" />
            </a-tree-select-node>

            <a-tree-select-node
              v-else
              v-for="opt in data"
              :selectable="true"
              :value="opt[idKey]+''"
              :key="opt[idKey]"
              :text="opt[textKey]"
              :title="opt[textKey]"
            />
          </a-tree-select>
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
import { focus } from "vue-focus";
import { TcInputMixing } from "../tc-input/tc-inputs-mixing";
import axios from "../../../../config/axios/axios";

export default {
  directives: { focus },
  mixins: [TcInputMixing],
  props: {
    fetching: Boolean,
    idKey: {
      type: String,
      default: "id"
    },
    textKey: {
      type: String,
      default: "text"
    },
    defaultValue: String |Number,
    dataSource: Array,
    url: String,
    params:{
      type:Object,
      default:null
    }
  },
  data: () => {
    return {
      self_data: null,
      loading: false
    };
  },
  computed: {
    // dataSource if data is pased for props, or self_data for search data in url on mounted
    data() {
      return this.dataSource || this.self_data;
    }
  },
  async beforeMount() {
    if (this.url) {
      this.loading = true;
      this.request()
    }
  },
  methods: {
    filter(input, treeNode) {
      return (
        treeNode.data.attrs.text.toUpperCase().indexOf(input.toUpperCase()) >= 0
      );
    },
    request(){
      const params=this.params
      axios.get(this.url,{params}).then(({ data }) => {
        this.loading = false;
        this.self_data = data.data;
      });
    },
    refresh() {
      this.loading = true;
      this.request()
    }
  },
  watch: {
    value: function(value, old) {
      if (!value && old) {
        this.$emit("onClear");
      }
    }
  }
};
</script>
<style lang="scss" >
.loading-autocomplete {
  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
    background-color: white;
  }
}
</style>
