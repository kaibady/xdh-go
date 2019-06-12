<template>
  <el-select v-bind="$attrs" v-on="$listeners" v-model="fieldValue" @keyup.native.13.stop>
    <el-option v-for="(item, index) in options"
               :key="index"
               :label="item.label"
               :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  /**
   * 下拉框
   * @module widgets/xdh-form/items/select
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/select">el-select</a>
     * @member props
     * @property {object[]} options 选项对象数组，对象需包含 {label, value} 描述数据
     * @property {array} [value] 回填选中的值
     */
    props: {
      value: {
        type: [String, Number, Boolean, Array]
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      fieldValue: {
        get() {
          return this.value
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

