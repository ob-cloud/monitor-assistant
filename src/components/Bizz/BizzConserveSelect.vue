<template>
  <a-select :default-value="value" :placeholder="placeholder" @change="handleItemChange" style="width: 120px">
    <div slot="dropdownRender" slot-scope="menu">
      <v-nodes :vnodes="menu" />
      <a-divider v-if="hasMore" style="margin: 4px 0;" />
      <div
        v-if="hasMore"
        class="action"
        @mousedown="e => e.preventDefault()"
        @click="handleActionChange"
      >
        <a-icon v-if="iconPosition === 'left'" :type="icon" /> {{ actionText }} <a-icon v-if="iconPosition === 'right'" :type="icon" />
      </div>
    </div>
    <a-select-option v-for="item in viewItemsInUsage" :key="item.id" :value="item.id">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'BizzConserveSelect',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    actionText: {
      type: String,
      default: '查看更多'
    },
    icon: {
      type: String,
      default: 'double-right'
    },
    iconPosition: {
      type: String,
      default: 'right'
    },
    optionItemProp: {
      type: Object,
      default: null
    },
    listCount: {
      type: Number,
      default: Infinity
    }
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    }
  },
  watch: {
    value (val) {
      console.log('[ConserveSelect] ', val)
    }
  },
  computed: {
    viewItemsInUsage () {
      if (this.listCount === Infinity || this.listCount === 0) { // 全部展示
        return this.transformOptionProp(this.dataSource)
      }
      const cutViewItems = this.dataSource.slice(0, this.listCount)
      return this.transformOptionProp(cutViewItems)
    },
    hasMore () {
      return !(this.listCount === Infinity || this.listCount === 0 || this.dataSource < this.listCount)
    }
  },
  methods: {
    transformOptionProp (list) {
      if (this.optionItemProp && list.length) {
        list.forEach(item => {
          item['id'] = item[this.optionItemProp.key || 'id']
          item['label'] = item[this.optionItemProp.label || 'label']
        })
      }
      return list
    },
    handleActionChange () {
      this.$emit('change')
    },
    handleItemChange (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="less" scoped>
.action{
  padding: 6px 8px;
  cursor: pointer;
  font-size: 10px;
  text-align: center;
  transition: all .3s;

  &:hover{
    color: #000;
  }
}
</style>
