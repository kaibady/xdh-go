<template>
  <el-input-number v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-input-number>
</template>

<script>
  /**
   * 数字输入框
   * @module widgets/xdh-form/items/number
   */
  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/input-number">el-input</a>
     * @member props
     */
    props: {
      value: {
        type: Number
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


