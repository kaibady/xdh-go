<template>
  <el-color-picker v-bind="$attrs" v-on="$listeners" v-model="fieldValue"></el-color-picker>
</template>

<script>
  /**
   * 颜色选择器
   * @module widgets/xdh-form/items/color
   */

  export default {
    /**
     * 属性参数, 继承 <a href="/xdh-web-doc/#/element/color-picker">el-color-picker</a>
     * @member props
     */
    props: {
      value: {
        type: String
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
