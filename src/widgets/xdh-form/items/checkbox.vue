<template>
  <el-checkbox-group v-bind="$attrs" v-on="$listeners" v-model="fieldValue">
    <component :is="component"
               v-for="(item,index) in options"
               :key="index"
               :label="item.value">{{item.label}}
    </component>
  </el-checkbox-group>
</template>

<script>
  /**
   * 复选框
   * @module widgets/xdh-form/items/checkbox
   */

  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/checkbox">el-checkbox</a>
     * @member props
     * @property {object[]} options 选项对象数组，对象需包含 {label, value} 描述数据
     * @property {array} [value] 回填选中的值
     * @property {boolean} [button] 按钮模式
     */
    props: {
      value: {
        type: Array
      },
      options: {
        type: Array,
        default() {
          return []
        }
      },
      // 是否按钮模式
      button: Boolean
    },
    computed: {
      component() {
        return this.button ? 'el-checkbox-button' : 'el-checkbox'
      },
      fieldValue: {
        get() {
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>

