<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners" v-model="fieldValue">
    <component :is="component"
               v-for="(item,index) in options"
               :key="index"
               :label="item.value">{{item.label}}
    </component>
  </el-radio-group>
</template>

<script>
  /**
   * 单选框
   * @module widgets/xdh-form/items/radio
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/radio">el-radio</a>
     * @member props
     * @property {object[]} options 选项对象数组，对象需包含 {label, value} 描述数据
     * @property {array} [value] 回填选中的值
     * @property {boolean} [button] 按钮模式
     */
    props: {
      value: {
        type: String
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
        return this.button ? 'el-radio-button' : 'el-radio'
      },
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

